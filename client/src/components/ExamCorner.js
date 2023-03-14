import React from "react";
import styled from "styled-components";

const ExamCorner = () => {
  return (
    <Container>
      <ExamWrapper>
        <Exam>
          <Image
            src="/assets/examcorner/iitjee.jpg"
            alt="Error"
            style={{
              height: "150px",
              width: "170px",
              zIndex: "-1",
              position: "relative",
              borderRadius: "50%",
            }}
          />
        </Exam>
        <Exam>
          <Image
            src="/assets/examcorner/upsc.jpeg"
            alt="Error"
            style={{
              height: "146px",
              width: "165px",
              zIndex: "-1",
              position: "relative",
              borderRadius: "50%",
            }}
          />
        </Exam>
        <Exam>
          <Image
            src="/assets/examcorner/nda.jpg"
            alt="Error"
            style={{
              height: "150px",
              width: "172px",
              zIndex: "-1",
              position: "relative",
              borderRadius: "50%",
            }}
          />
        </Exam>
        <Exam>
          <Image
            src="/assets/examcorner/neet.png"
            alt="Error"
            style={{
              height: "150px",
              width: "173px",
              zIndex: "-1",
              position: "relative",
              borderRadius: "50%",
            }}
          />
        </Exam>
        <Exam>
          <Image
            src="/assets/examcorner/cgl.png"
            alt="Error"
            style={{
              height: "157px",
              width: "170px",
              zIndex: "-1",
              position: "relative",
              borderRadius: "50%",
            }}
          />
        </Exam>
      </ExamWrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 200px;
  margin-top: 20px;
  padding: 10px 5px;
`;

const ExamWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid black;
  display: flex;
  padding: 10px 0px;
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
  // box-shadow: 2px 7px 29px 4px rgba(0, 0, 0, 0.75);
`;

const Exam = styled.div`
  width: 170px;
  height: 80%;
  // border: 2px solid red;
  border-radius: 50%;
  border: 1px solid black;
  box-shadow: 1px 1px 30px 1px rgba(0, 0, 0, 0.75);
`;
const Image = styled.img``;
export default ExamCorner;
