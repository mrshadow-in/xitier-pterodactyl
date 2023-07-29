import TransferListener from '@/components/server/TransferListener';
import React, { useEffect, useState } from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import NavigationBarServer from '@/components/NavigationBarServer';
import TransitionRouter from '@/TransitionRouter';
import WebsocketHandler from '@/components/server/WebsocketHandler';
import { ServerContext } from '@/state/server';
import { CSSTransition } from 'react-transition-group';
import Can from '@/components/elements/Can';
import Spinner from '@/components/elements/Spinner';
import { NotFound, ServerError } from '@/components/elements/ScreenBlock';
import { httpErrorToHuman } from '@/api/http';
import { useStoreState } from 'easy-peasy';
import SubNavigation from '@/components/elements/SubNavigation';
import Alert from '@/components/elements/custom/Alert';
import InstallListener from '@/components/server/InstallListener';
import ErrorBoundary from '@/components/elements/ErrorBoundary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router';
import ConflictStateRenderer from '@/components/server/ConflictStateRenderer';
import ContentContainer from '@/components/elements/ContentContainer';
import PermissionRoute from '@/components/elements/PermissionRoute';
import routes from '@/routers/routes';
import styled from 'styled-components/macro';
import CollapseBtn from '@/components/elements/custom/CollapseBtn';
import SearchContainer from '@/components/dashboard/search/SearchContainer';
import TopElement from '@/components/server/console/TopElement';
import { Navigation, ComponentLoader } from '@/routers/ServerElements';

const ContainerBlock = styled.div`
    display:flex;
    width:100%;

    & > .contentBlock{
        width:100%;
    }
    @media only screen and (max-width:979px){
      &{
          display:block;
      }
      & .collapseBtn{
          display:none;
      }
    }
`;

export default () => {
    const match = useRouteMatch<{ id: string }>();
    const location = useLocation();

    const rootAdmin = useStoreState((state) => state.user.data!.rootAdmin);
    const [error, setError] = useState('');

    const id = ServerContext.useStoreState((state) => state.server.data?.id);
    const uuid = ServerContext.useStoreState((state) => state.server.data?.uuid);
    const inConflictState = ServerContext.useStoreState((state) => state.server.inConflictState);
    const serverId = ServerContext.useStoreState((state) => state.server.data?.internalId);
    const getServer = ServerContext.useStoreActions((actions) => actions.server.getServer);
    const clearServerState = ServerContext.useStoreActions((actions) => actions.clearServerState);

    const to = (value: string, url = false) => {
        return `${(url ? match.url : match.path).replace(/\/*$/, '')}/${value.replace(/^\/+/, '')}`;
    };

    useEffect(
        () => () => {
            clearServerState();
        },
        []
    );

    useEffect(() => {
        setError('');

        getServer(match.params.id).catch((error) => {
            console.error(error);
            setError(httpErrorToHuman(error));
        });

        return () => {
            clearServerState();
        };
    }, [match.params.id]);

    return (
        <React.Fragment key={'server-router'}>
            <ContainerBlock>
                <NavigationBarServer />
                <div className='contentBlock'>
                    {!uuid || !id ? (
                        error ? (
                            <ServerError message={error} />
                        ) : (
                            <Spinner size={'large'} centered />
                        )
                    ) : (
                        <>
                            <CSSTransition timeout={150} classNames={'fade'} appear in>
                                <ContentContainer>
                                    <SubNavigation>
                                        <div>
                                            <div className='collapseBtn'>
                                                <CollapseBtn/>
                                            </div>
                                            <SearchContainer/>
                                        </div>
                                        <div css='display:var(--subnavigation) !important;'>
                                            <Navigation />
                                            {rootAdmin && (
                                                // eslint-disable-next-line react/jsx-no-target-blank
                                                <a href={`/admin/servers/view/${serverId}`} target={'_blank'}>
                                                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                                                </a>
                                            )}
                                        </div>
                                    </SubNavigation>
                                    <Alert/>
                                </ContentContainer>
                            </CSSTransition>
                            <InstallListener />
                            <TransferListener />
                            <WebsocketHandler />
                            {inConflictState && (!rootAdmin || (rootAdmin && !location.pathname.endsWith(`/server/${id}`))) ? (
                                <ConflictStateRenderer />
                            ) : (
                                <ErrorBoundary>
                                  <TransitionRouter>
                                    <div className={'mt-4 sm:mt-10'}>
                                        <ContentContainer className={'mb-4'} css='display:var(--infoelement)!important;' >
                                            <TopElement/> 
                                        </ContentContainer>
                                    </div>
                                    <Switch location={location}>
                                      <ComponentLoader />
                                      <Route path={'*'} component={NotFound} />
                                    </Switch>
                                  </TransitionRouter>
                                </ErrorBoundary>
                            )}
                        </>
                    )}
                </div>
            </ContainerBlock>
        </React.Fragment>
    );
};
