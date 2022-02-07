/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: eslint 지우기
import { useState, useEffect, useCallback } from 'react';
import { Board, Timer, Stage, Point } from '../../components';
import useTimer, { TimerHookProps } from '../../hooks/useTimer';
import usePoint, { PointHookProps } from '../../hooks/usePoint';
import useStage, { StageHookProps } from '../../hooks/useStage';
import * as Styled from './styled';

function Play(): JSX.Element {
  const { stage, animationActive, clearStage, resetStage }: StageHookProps = useStage();
  const { time, startGame, stopGame, resetTime, minusTime }: TimerHookProps = useTimer();
  const { point, resetPoint, scorePoint }: PointHookProps = usePoint();

  const handleAnswerCardClick = useCallback(() => {
    clearStage();
    resetTime();
    scorePoint(stage, time);
  }, [clearStage, resetTime, scorePoint, stage, time]);

  const handleWrongCardClick = useCallback(() => {
    minusTime();
  }, [minusTime]);

  useEffect(() => {
    startGame();
    return () => stopGame();
  }, [startGame, stopGame]);

  useEffect(() => {
    if (time <= 0) {
      resetStage();
      resetTime();
      resetPoint();
      alert(`스테이지: ${stage}, 점수: ${point}`); // TODO: 게임 끝 구현하기
    }
  }, [point, resetPoint, resetStage, resetTime, stage, time]);

  return (
    <Styled.Container>
      <Stage active={animationActive} stage={stage} />
      <Timer time={time} />
      <Board
        handleAnswerCardClick={handleAnswerCardClick}
        handleWrongCardClick={handleWrongCardClick}
        stage={stage}
      />
      <Point point={point} />
    </Styled.Container>
  );
}

export default Play;
