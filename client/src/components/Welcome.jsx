import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Colombe from "./../assets/logo.png";
export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function setUser() {
      setUserName(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).username
      );
    }
    setUser();
  }, []);

  return (
    <Container>
      {/* <img src={Colombe} alt="" /> */}
      <div className="label">
        <h2>Bonjour {userName.toUpperCase()}</h2>
        <h2>
          Bienvenue sur la <i style={{ "color": '#4e0eff' }}>Colombe</i>,
        </h2>
        <br />
        <center>Choisie un ami pour commencer la discussion.</center>
      </div>
    </Container>
  );
}

const Container = styled.div`
  background: white;
  background-image: url(${Colombe});
  background-repeat: no-repeat;
  background-size: 15rem;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  color: black;
  .label{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    height: 10rem;
  }
  span {
    /* color: #4e0eff; */
  }
`;
