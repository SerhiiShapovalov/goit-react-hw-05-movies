import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const LinkList = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
`;

const LinkStyle = styled(NavLink)`
  color: rgb(115, 25, 45);
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: 5px;
  text-decoration: none;

  &:hover,
  &:focus {
    color: blue;
  }

  &.active {
    background-color: yellow;
  }
`;

export default function SharedLayout() {
  return (
    <div>
      <nav>
        <LinkList>
          <li>
            <LinkStyle to="/">Home</LinkStyle>
          </li>
          <li>
            <LinkStyle to="/movies">Movies</LinkStyle>
          </li>
        </LinkList>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
