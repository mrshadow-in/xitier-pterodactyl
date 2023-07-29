import React, { forwardRef, useState, useEffect } from 'react';
import { Form } from 'formik';
import styled from 'styled-components/macro';
import { breakpoint } from '@/theme';
import FlashMessageRender from '@/components/FlashMessageRender';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import tw from 'twin.macro';

type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    title?: string;
};

const Container = styled.div`
    ${breakpoint('sm')`
        ${tw`w-4/5 mx-auto`}
    `};

    ${breakpoint('md')`
        ${tw`p-10`}
    `};

    ${breakpoint('lg')`
        ${tw`w-3/5`}
    `};

    ${breakpoint('xl')`
        ${tw`w-full`}
        max-width: 700px;
    `};

    .box{
        background-color:var(--secondary);
    }
`;

export default forwardRef<HTMLFormElement, Props>(({ title, ...props }, ref) => {
    const name = useStoreState((state: ApplicationStore) => state.settings.data!.name);

    return (
    <Container>
        <FlashMessageRender css={tw`mb-2 px-1`}/>
        <h1 className={'text-2xl font-medium text-white text-center py-4'}>{name}</h1>
        <Form {...props} ref={ref}>
            <div css={tw`md:flex w-full shadow-lg rounded-lg p-6 mx-1`} className='box'>
                <div css={tw`flex-1`}>
                    {title && <h2 css={tw`text-lg text-neutral-100 font-medium pb-2`}>{title}</h2>}
                    {props.children}
                </div>
            </div>
        </Form>
        <p css={tw`text-center text-neutral-500 text-xs mt-4`}>
            &copy; 2015 - {new Date().getFullYear()}&nbsp;
            <a
                rel={'noopener nofollow noreferrer'}
                href={'https://pterodactyl.io'}
                target={'_blank'}
                css={tw`no-underline text-neutral-500 hover:text-neutral-300`}
            >
                Pterodactyl Software
            </a>
        </p>
    </Container>
)});
