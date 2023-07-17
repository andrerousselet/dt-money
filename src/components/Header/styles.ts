import { styled } from "styled-components";

export const HeaderContainer = styled.header`
  background-color: ${props => props.theme["gray-900"]};
  padding: 2.5rem 0 7.5rem;
`;

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NewTransactionButton = styled.button`
  border: none;
  height: 3.125rem;
  background-color: ${props => props.theme["green-500"]};
  color: ${props => props.theme.white};
  font-weight: bold;
  padding: 0 1.125rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 200ms;

  &:hover {
    background-color: ${props => props.theme["green-700"]};
  }
`;