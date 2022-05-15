import styled from 'styled-components';

export const BoxContainer = styled.div`
    width:100;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:10px;
`;


export const FormContainer = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
`;

export const MutedLink = styled.a`
    font-size:12px;
    color : rgba(200, 200, 200, 0.8);
    font-weight: 500;
    text-decoration: none;
`;

export const BoldLink = styled.a`
    font-size:12px;
    color : rgb(241,196,15);
    font-weight: 500;
    text-decoration: none;
    margin: 0 4px;
`;


export const Input = styled.input`
    width: 100%;
    height: 45px;
    outline:none;
    border: 1px solid rgba(200,200,200,0.3);
    padding:0px 10px;
    margin-bottom:10px ;
    border-bottom: 1.4px solid transparent ;
    transition: all, 200ms ease-in-out;
    font-size: 15px;
    color : gray;
    &::placeholder{
        color: rgba(200,200,200,1);
    }
    &:not(last-of-type){
        border-bottom: 1.5px solid rgba(200,200,200,0.4);
    }
    &:focus{
        outline: none;
        border-bottom: 2px solid rgb(241,196,15) ;
    }
`;

export const SubmitBTN = styled.button`
    width:100%;
    padding: 10px 30%;
    color: #fff;
    font-size: 25px;
    font-weight: 600;
    border: none;
    border-radius: 100px 100px 100px 100px;
    cursor: pointer;
    transition: all, 240ms ease-in-out;
    background: rgb(241,196,15);
    background: linear-gradient(58deg, rgba(241,196,15,1) 20%, rgba(243,172,18,1) 100%);
    &:hover{
        filter: brightness(1.03);
    }
`;