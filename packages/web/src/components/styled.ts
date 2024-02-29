import styled from "styled-components";

export const Container = styled.div<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor || "gray"};
  width: 90%;
  align-self: center;
  margin: auto;
  border-radius: 5;
`;

export const Heading1 = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: black;
  text-align: center;
  padding-top: 10px;
`;

export const Heading2 = styled.h2`
  font-weight: bold;
  text-align: center;
  padding: 5px;
  font-size: 24px;
  color: #d3d3d3;
`;

export const Heading3 = styled.h3`
  font-weight: bold;
  text-align: center;
  color: #d3d3d3;
  padding: 5px;
`;

export const WhiteLabel = styled.span`
  color: white;
`;

export const Loading = styled.p`
  text-align: center;
  padding: 10px;
`;
