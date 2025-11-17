import {useEffect, useState} from "react";

const usePagination = <T>(countPerPage: number) => { // countPerPage를 종속성에 추가해야 함

  const [totalList,setTotalList] = useState<T[]>([]);
  const [viewList, setViewList] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPageList, setTotalPageList] = useState<number[]>([1]);
  const [viewPageList, setViewPageList] = useState<number[]>([1]);
  const [currentSection,setCurrentSection] = useState<number>(1);
  const [totalSection,setTotalSection] = useState<number>(1);

  // function 보여줄 객체 리스트 추출 함수
  const setView = () =>{
    const FIRST_INDEX = countPerPage * (currentPage - 1);
    const LAST_INDEX = totalList.length > countPerPage * currentPage ? countPerPage * currentPage : totalList.length;
    const viewList = totalList.slice(FIRST_INDEX, LAST_INDEX);
    setViewList(viewList);
  }

  // 보여줄 페이지 리스트 추출 (🚨 수정된 로직)
  const setViewPage = () =>{
    const FIRST_INDEX = 10 * (currentSection - 1);
    // 🚨 수정: totalList.length 대신 totalPageList.length를 사용하여 범위를 제한합니다.
    const LAST_INDEX = Math.min(10 * currentSection, totalPageList.length);

    const viewPageList = totalPageList.slice(FIRST_INDEX, LAST_INDEX);
    setViewPageList(viewPageList);
  };

  // totalList가 변경될때마다 실행할 작업
  useEffect(() => {
    // 1. totalPageList 계산
    const totalPage = Math.ceil(totalList.length / countPerPage);
    const totalPageList: number[] = [];
    for(let index = 1; index <= totalPage; index++) totalPageList.push(index);
    setTotalPageList(totalPageList);

    // 2. totalSection 계산 (10페이지 단위)
    const totalSection = Math.ceil(totalPage / 10); // totalList.length 대신 totalPage를 사용해야 더 정확합니다.
    setTotalSection(totalSection);

    // 3. 상태 초기화
    setCurrentPage(1);
    setCurrentSection(1);

    // setView()와 setViewPage()는 아래의 useEffect에 의해 자동으로 실행됩니다.
  }, [totalList, countPerPage]); // countPerPage 추가

  // currentPage가 변경될때마다 실행할 작업 (totalList, countPerPage 추가)
  useEffect(() => setView(), [currentPage, totalList, countPerPage]);

  // currentSection이 변경될때마다 실행할 작업 (totalPageList 추가)
  useEffect(() => setViewPage(), [currentSection, totalPageList]);

  return {
    currentPage,
    setCurrentPage,
    currentSection,
    setCurrentSection,
    viewList,
    viewPageList,
    totalSection,
    setTotalList
  }
};
export default usePagination;