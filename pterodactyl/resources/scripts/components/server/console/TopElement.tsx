import React, { useEffect, useState, useMemo } from 'react';
import { ServerContext } from '@/state/server';
import styled from 'styled-components/macro';
import CopyOnClick from '@/components/elements/CopyOnClick';
import { ip } from '@/lib/formatters';
import * as Icon from 'react-feather';
import Can from '@/components/elements/Can';
import PowerButtons from '@/components/server/console/PowerButtons';
import { SocketEvent, SocketRequest } from '@/components/server/events';
import UptimeDuration from '@/components/server/UptimeDuration';
import useWebsocketEvent from '@/plugins/useWebsocketEvent';

const DetailsItem = styled.div`
    position:relative;
    background-color:var(--secondary);
    border-radius:var(--border-radius-items);
    overflow:hidden;
    margin-bottom:10px;
    padding:20px 25px;
`;

type Stats = Record<'uptime', number>;

const TopElement = () => {
    const [ stats, setStats ] = useState<Stats>({ uptime: 0 });

    const connected = ServerContext.useStoreState(state => state.socket.connected);
    const instance = ServerContext.useStoreState(state => state.socket.instance);
    const name = ServerContext.useStoreState(state => state.server.data?.name);
    const description = ServerContext.useStoreState(state => state.server.data?.description);
    const id = ServerContext.useStoreState(state => state.server.data?.id);
    const node = ServerContext.useStoreState((state) => state.server.data?.node);
    const status = ServerContext.useStoreState((state) => state.status.value);
    const allocation = ServerContext.useStoreState((state) => {
        const match = state.server.data?.allocations.find((allocation) => allocation.isDefault);

        return !match ? 'n/a' : `${match.alias || ip(match.ip)}:${match.port}`;
    });
    
    const statsListener = (data: string) => {
        let stats: any = {};
        try {
            stats = JSON.parse(data);
        } catch (e) {
            return;
        }

        setStats({
            uptime: stats.uptime || 0,
        });
    };

    useEffect(() => {
        if (!connected || !instance) {
            return;
        }

        instance.addListener(SocketEvent.STATS, statsListener);
        instance.send(SocketRequest.SEND_STATS);

        return () => {
            instance.removeListener(SocketEvent.STATS, statsListener);
        };
    }, [ instance, connected ]);

    return (
        <DetailsItem>
            <div className={'flex lg:flex-row flex-col gap-y-3 lg:items-center justify-between'}>
                <div className={'shrink-0'}> 
                    <h1 className='text-xl font-semibold mb-1'>{name}</h1>
                    {description && <p className={'mb-2 text-sm text-gray-300'}>{description}</p>}
                    <div className="md:flex items-center gap-x-6">
                        <div className={'flex align-center gap-x-1'}>
                            {status == 'offline' ?
                                <>
                                    <span css="color:#AC2427;"><Icon.Radio size={24}/></span>
                                    Offline
                                </>
                                :
                                <>
                                    {status == 'running' ?
                                        <>
                                        <span css="color:#14914E;"><Icon.Radio size={24}/></span>
                                        Online
                                        </>
                                    :
                                    <>
                                        {status == 'stopping' ?
                                            <>
                                                <span css="color:#AC2427;"><Icon.Radio size={24}/></span>
                                                Offline
                                            </>
                                        :
                                        <>
                                            <span css="color:orange;"><Icon.Radio size={24}/></span>
                                            Starting
                                        </>
                                        }
                                    </>
                                    }
                                </>
                            }
                        </div>
                        <div className={'flex align-center gap-x-1'}>
                            <CopyOnClick text={allocation}>
                                <span className={'flex align-center gap-x-1'}>
                                    <span css={'color:var(--primary);'}><Icon.Globe size={24}/></span>
                                    {allocation}
                                </span>
                            </CopyOnClick>
                        </div>
                        <div className={'flex align-center gap-x-1'}>
                            <CopyOnClick text={id}>
                                <span className={'flex align-center gap-x-1'}>
                                    <span css={'color:var(--primary);'}><Icon.Hash size={24}/></span>
                                    {id}
                                </span>
                            </CopyOnClick>
                        </div>
                        <div className={'flex align-center gap-x-1'}>
                            <span css={'color:var(--primary);'}><Icon.Server size={24}/></span>
                            {node}
                        </div>
                        {stats.uptime > 0 &&
                            <div className={'flex align-center gap-x-1'}>
                                <span css={'color:var(--primary);'}><Icon.Power size={24}/></span>
                                <UptimeDuration uptime={stats.uptime / 1000}/>
                            </div>
                        }
                    </div>
                </div>
                <Can action={['control.start', 'control.stop', 'control.restart']} matchAny>
                    <PowerButtons className={'flex sm:justify-end space-x-2 my-2'} />
                </Can>
            </div>
        </DetailsItem>
    );
};

export default TopElement;
