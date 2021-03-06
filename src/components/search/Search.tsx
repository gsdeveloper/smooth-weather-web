import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppInfo } from '../../provider/Provider';
import { capitalize } from 'utils';
import { ClipLoader } from 'react-spinners';
import { useCity } from 'components/hooks';
import { css } from '@emotion/core';

// const fakeData = [
//   {
//     city: "San Diego",
//     date: "12 september",
//     temperature: 18,
//     climate: "Cloudy",
//     wind: 68,
//     hum: 25,
//   },
//   {
//     city: "Sao Paulo",
//     date: "12 september",
//     temperature: 68,
//     climate: "Cloudy",
//     wind: 50,
//     hum: 80,
//   },
//   {
//     city: "SOklahoma",
//     date: "123tember",
//     temperature: 19,
//     climate: "Cloudy",
//     wind: 50,
//     hum: 87,
//   },
//   {
//     city: "Oklahoma",
//     date: "12 5ptember",
//     temperature: 68,
//     climate: "Cw31udy",
//     wind: 56,
//     hum: 97,
//   },
//   {
//     city: "Hong kong",
//     date: "12 septe21mber",
//     temperature: 29,
//     climate: "Clcudy",
//     wind: 10,
//     hum: 17,
//   },
// ];

const Search = () => {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const { isSearchOpen, setIsSearchOpen, setSearch, search } = useAppInfo();

  useEffect(() => {
    const city = localStorage.getItem('CITY');
    if (city) {
      setSearch(city);
    }
  }, []);

  const { data, isLoading } = useCity(search);

  useEffect(() => {
    if (data) {
      if (data.cod !== 200) {
        setErrorMessage(data.message);
      } else {
        localStorage.setItem('CITY', data.name);
        setErrorMessage(data.name);
      }
    }
  }, [data]);

  return isSearchOpen ? (
    <SearchContainer>
      <SearchBarWrapper>
        <GoBack onClick={() => setIsSearchOpen(false)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3.828 6.99998H16V8.99998H3.828L9.192 14.364L7.778 15.778L0 7.99998L7.778 0.221985L9.192 1.63598L3.828 6.99998Z"
              fill="#444E72"
            />
          </svg>
        </GoBack>
        <SearchBar
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
          }}
          placeholder="City name"
        />
        <ClipLoader size={20} css={loading} loading={isLoading} color="black" />
      </SearchBarWrapper>
      {/* <ResultsList>
        {fakeData.map((el, i) => (
          <Result
            onPressOut={() => {
              setCurrentLocal(el);
              setIsSearchOpen(false);
            }}
            key={i}
            index={i}
          >
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM13 12H17V14H11V7H13V12Z"
                fill="#444E72"
              />
            </Svg>
            <ResultText>{el.city}</ResultText>
            <ResultTemperature>34° / 23°</ResultTemperature>
          </Result>
        ))}
      </ResultsList> */}

      <ResultsList>
        <Result
          disabled={data?.cod !== 200 ? true : false}
          onClick={() => setIsSearchOpen(false)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM13 12H17V14H11V7H13V12Z"
              fill="#444E72"
            />
          </svg>
          <ResultText>
            {!isLoading && errorMessage
              ? capitalize(errorMessage)
              : data && data.name
              ? data.name
              : ' '}
          </ResultText>
          <ResultTemperature>
            {data && data.main
              ? `${data.main.temp_min.toFixed(
                  0
                )}° / ${data.main.temp_max.toFixed(0)}°`
              : ' '}
          </ResultTemperature>
        </Result>
      </ResultsList>
    </SearchContainer>
  ) : null;
};

const loading = css`
  position: absolute;
  right: 20px;
  z-index: 1;
`;

const ResultsList = styled.div`
  width: 100%;
  margin-top: 25px;
`;

const Result = styled.button`
  width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// type ResultProps = {
//   index: number;
// };

// const Result = styled.TouchableOpacity<ResultProps>`
//   width: 100%;

//   padding-top: 10px;
//   padding-bottom: 10px;
//   margin-top: 10px;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
// `;

const ResultText = styled.p`
  color: #444e72;
  font-size: 18px;
  font-weight: 700;
  font-family: Overpass;
`;

const ResultTemperature = styled(ResultText)`
  font-size: 14px;
`;

const GoBack = styled.button`
  position: absolute;
  width: 30px;
  height: 30px;
  left: 10px;
  z-index: 1;
`;

const SearchContainer = styled.div`
  position: absolute;
  background: #fcfcfc;
  box-shadow: 0px 7px 15px rgba(0, 0, 0, 0.18);
  padding: 49px 30px 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  top: 0;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  width: 100%;
  max-width: 700px;
  z-index: 1;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;

const SearchBar = styled.input`
  background: #ffffff;
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.19);
  border-radius: 15px;
  padding: 15px 56px;
  color: #444e72;
  font-family: Overpass;
  font-size: 18px;
  border-width: 3px;
  border-color: white;
  border: 1px;
`;

export default Search;
