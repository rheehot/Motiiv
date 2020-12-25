import React from 'react'
import styled from 'styled-components';

const Template = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(126,196,253,1);
    width: 100%;
    height: 25rem;
    margin-top: 20rem;
`;
const Logo = styled.div`
    width: 18rem;
    height: 4.8rem;
    //object-fit: contain;
    font-size: 7rem;
    color: rgba(240,249,254,1);
    margin-bottom: 2rem;
`;
const Text = styled.div`
    margin-top: 3rem;
    font-size: 22px;
    //margin-bottom: 5rem;
    text-align: center;
    color: rgba(240,249,254,1);
    font-weight: bold;
    @media only screen and (max-width:740px){
        font-size: 15px;
        ${Logo}{
            width: 10rem;
            height:auto;
        }
    }
`;
function Footer() {
    return (
        <Template>
            <Logo>Motiiv</Logo>
            <Text>
                Copyright © 2020 이동훈 유보미 이영진 홍예나 변정인 김정욱 김정재 All right reserved
                <br/>Motiiv Web Site
            </Text>
        </Template>
    )
}

export default Footer
