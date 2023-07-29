import React, { useState } from 'react';
import * as Icon from 'react-feather';
import useEventListener from '@/plugins/useEventListener';
import SearchModal from '@/components/dashboard/search/SearchModal';
import styled from 'styled-components/macro';

const SearchForm = styled.div`
    &{  
        cursor:pointer;
        display:flex !important;
        grid-gap:10px;
        align-items:center;
        background-color:var(--input);
        margin:10px 15px;
        padding:7px 10px !important;
        width:100%;
        max-width:300px;
        border-radius:var(--borderradius);
        color:var(--sub-color);
    }
`;

export default () => {
    const [visible, setVisible] = useState(false);

    useEventListener('keydown', (e: KeyboardEvent) => {
        if (['input', 'textarea'].indexOf(((e.target as HTMLElement).tagName || 'input').toLowerCase()) < 0) {
            if (!visible && e.metaKey && e.key.toLowerCase() === '/') {
                setVisible(true);
            }
        }
    });

    return (
        <>
            {visible &&
            <SearchModal
                appear
                visible={visible}
                onDismissed={() => setVisible(false)}
            />
            }
            <SearchForm onClick={() => setVisible(true)}>
                <Icon.Search size={15}/> Search Something...
            </SearchForm>
        </>
    );
};
