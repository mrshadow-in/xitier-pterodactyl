import styled from 'styled-components/macro';
import tw, { theme } from 'twin.macro';

const NavigationBar = styled.div`
width:323px;
background-color:var(--secondary);
border-right:1px solid #484961;
height:100vh;
position:sticky;
top:0;
transition:width 0.3s;

#logo{
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
}
#logo > a{
    padding:0 !important;
    width:100%;
    justify-content:center;
}
#logo .collapseBtn{
    display:none;
}
#logo span{
    padding-left:5px;
}
#logo img{
    max-width: 40px !important;
    border-radius: 5px !important;
}

@media only screen and (min-width:979px){
.collapse &{
    width:100px;

    #logo img{
        display:block;
    }

    & a {
        justify-content:center;
        
        & .icon{
            margin-right:0;
        }
        & > span{
            transition:display 0.3s;
            display:none;
        }
    }
    .subTitle{
        transition:display 0.3s;
        display:none;
    }
    .logOut{
        flex-direction:column;
        justify-content:center;
    }
}
}

& > div:last-of-type{
    padding-left:10px;
    padding-right:10px;
    overflow-y:auto;
    display:flex;
    flex-direction:column;
    height:100vh;
}

& #logo {
    text-align:center;
    padding:23px 0px;

    & > a {
        ${tw`text-2xl font-header no-underline text-neutral-200 hover:text-neutral-100 transition-colors duration-150`};
    }
}

& a, & button, & .navigation-link {
    ${tw`no-underline text-neutral-300 cursor-pointer transition-all duration-150`};
    padding:6px .5em 6px;
    display:flex;
    align-items:center;
    border-radius:var(--borderradius);
    
    &:active, &.active, &:hover, &:focus {
        background-color:var(--secondary-hover);
        color:var(--white);
        
        .icon{
            color:var(--primary);
        }
    }

    .icon{
        padding-left:1px;
        width:35px;
        height:35px;
        font-size:.6em;
        display:flex;
        align-items:center;
        justify-content:center;
        border-radius:100%;
    }
}
.logOut{
    ${tw`text-neutral-500`};
    padding-bottom:.5em;
    border-top:1px solid #484961;
    display:flex;
    justify-content:space-between;
    padding-top:10px;
    
    .icon{
        margin-right:0px;
    }
}
.media{
    margin-top:auto;
    padding-bottom:4px;
    padding-top:25px;
}
.subTitle{
    ${tw`text-neutral-500`};
    margin-top:30px;
    padding: 0 .5em;
    font-size: 0.8em;
}
.last{  
    margin-bottom:5px;
}
@media only screen and (max-width:979px){
    .hiddenMobile{
        display:none;
    }
    #logo a{
        justify-content: start;
    }
    #logo .collapseBtn{
        display:block;
    }
    .subTitle{
        display:none;
    }
    &{
        border-right:none;
        width:100%;
        height:auto;
        position:relative;
    }   
    & > div:last-of-type{
        margin-left:0;
        padding-left:10px;
        height:auto;
    }
    & a{
        display:none;
    }
    & .logOut{
        display:none;
    }
    & #logo a{
        display:flex;
    }
    .media{
        display:none;
    }
    .collapse &{
        & a{
            display:flex;
        }
        & .logOut{
            display:flex;
        }
        .media{
            display:flex;
        }
        .subTitle{
            display:block;
        }
    }
}
`;

export default NavigationBar;
