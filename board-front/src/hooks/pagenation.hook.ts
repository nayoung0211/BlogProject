import {useEffect, useState} from "react";

const usePagination = <T>(countPerPage: number) =>{
  //전체 객체 리스트
  const [totalList,setTotalList] = useState<T[]>([]);
  //보여줄 객체 리스트
  const [viewList, setViewList] = useState<T[]>([]);
  //현재 페이지 번호 상태
  const [currentPage, setCurrentPage] = useState<number>(1);
  //전체 페이지 번호 상태
  const [totalPage,setTotalPage] = useState<number>(1);
  //전체 페이지 번호 리스트
  const [totalPageList, setTotalPageList] = useState<number[]>([1]);
  //보여줄 페이지 번호 리스트 상태
  const [viewPageList, setViewPageList] = useState<number[]>([1]);
  //현재 섹션 상태
  const [currentSection,setCurrentSection] = useState<number>(1);
  //전체 섹션 상태
  const [totalSection,setTotalSection] = useState<number>(1);

  //function 보여줄 객체 리스트 추출 함수
  const setView = () =>{
    const FIRST_INDEX = countPerPage * (currentPage - 1);
    const LAST_INDEX = totalList.length > countPerPage * currentPage ? countPerPage * currentPage : totalList.length;
    const viewList = totalList.slice(FIRST_INDEX, LAST_INDEX);
    setViewList(viewList);
  }
  //보여줄 페이지 리스트 추출
  const setViewPage = () =>{
    const FIRST_INDEX = 10 * (currentSection - 1);
    const LAST_INDEX = totalPageList.length > 10 * currentSection ? 10 * currentSection : totalList.length;
    const viewPageList = totalPageList.slice(FIRST_INDEX, LAST_INDEX);
    setViewPageList(viewPageList);
  };

  //total Page가 변경될때마다 실행할 작업
  useEffect(() => {
    const totalPage = Math.ceil(totalList.length/countPerPage);
    const totalPageList: number[] = [];
    for(let index = 1; index <= totalPage; index++) totalPageList.push(index);
    setTotalPageList(totalPageList);

    const totalSection = Math.ceil(totalList.length / (countPerPage*10));
    setTotalSection(totalSection);

    setCurrentPage(1);
    setCurrentSection(1);

    setView();
    setViewPage();
  }, [totalList]);

  //currentPage가 변경될때마다 실행할 작업
  useEffect(setView,[currentPage]);

  //currentSection이 변경될때마다 실행할 작업
  useEffect(setViewPage,[currentSection]);

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