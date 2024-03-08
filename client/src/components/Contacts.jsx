import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import DefaultUserImage from "./../assets/default.jpeg"
import Logout from "./Logout";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    async function setUser() {
      const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    }
    setUser();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      <Container>
        <div className="brand">
          <div className="current-user">
            <div className="avatar">
              {currentUserImage && (
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              )}
              {!currentUserImage && (
                <img
                  className="profile"
                  src={DefaultUserImage}
                  alt="avatar"
                />
              )}
            </div>
            <div className="username">
              <h3>{currentUserName}</h3>
            </div>
          </div>
          <Logout />
        </div>
        <div className="contacts">
          {contacts.map((contact, index) => {
            return (
              <div
                key={contact._id}
                className={`contact ${index === currentSelected ? "selected" : ""
                  }`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  {contact.avatarImage && (
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  )}
                  {!contact.avatarImage && (
                    <img
                      className="profile"
                      src={DefaultUserImage}
                      alt="avatar"
                    />
                  )}
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #512da8;
  .brand { 
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    margin-top: 3rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.8rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        .profile{
          border-radius: 50%;
        }
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #0d0d30;
    }
  }

  .current-user {
      background-color: #0d0d30;
      min-height: 5rem;
      /* cursor: pointer; */
      width: 90%;
      border-radius: 0.8rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      .avatar {
        .profile{
          border-radius: 50%;
        }
        img {
          height: 3rem;
        }
      }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
