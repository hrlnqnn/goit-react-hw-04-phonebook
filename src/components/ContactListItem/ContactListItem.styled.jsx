import styled from '@emotion/styled';

export const Item = styled.li`
  display:flex;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

export const DeleteBtn = styled.button`
cursor:pointer;
`;
