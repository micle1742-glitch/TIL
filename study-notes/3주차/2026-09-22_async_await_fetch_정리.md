# 2026-09-22 오늘 배운 내용 & 나만의 정리

## 03. Async - Await부터 복습

# 1. 비동기 처리 (Asynchronous)

## 1-1. 동기와 비동기

### 동기 (Synchronous)
- 코드가 작성된 순서대로 실행되는 방식이다.
- 앞의 작업이 끝나야 다음 작업을 실행한다.
- 작업이 오래 걸리면 다음 작업도 기다려야 한다.

### 비동기 (Asynchronous)
- 시간이 오래 걸리는 작업의 완료를 기다리는 동안 다른 작업을 진행할 수 있는 방식이다.
- 서버 요청, 파일 읽기, 타이머 등 시간이 걸리는 작업에 사용된다.
- JavaScript에서는 Promise와 async/await 등을 이용해 비동기 작업을 처리할 수 있다.

### 오늘의 핵심
- 비동기 작업을 기다린다고 브라우저 전체가 멈추는 것은 아니다.
- `await`는 현재 `async` 함수의 실행을 잠시 멈추지만, 브라우저는 다른 작업을 처리할 수 있다.

---

# 2. Promise (프라미스)

## 2-1. Promise란?

- Promise는 비동기 작업의 미래 결과를 나타내는 객체이다.
- 서버에 데이터를 요청했을 때 결과가 바로 도착하지 않을 수 있다.
- Promise는 작업이 진행 중인지, 성공했는지, 실패했는지를 나타낸다.
- `fetch()`를 실행하면 Promise 객체가 반환된다.

### Promise의 3가지 상태

| 상태 | 의미 |
|---|---|
| `pending` | 비동기 작업이 진행 중인 대기 상태 |
| `fulfilled` | 비동기 작업이 성공적으로 완료된 상태 |
| `rejected` | 비동기 작업이 실패한 상태 |

- Promise는 처음에 `pending` 상태로 시작할 수 있다.
- 작업이 완료되면 `fulfilled` 또는 `rejected` 상태가 된다.
- 한 번 완료된 Promise의 상태는 다시 바뀌지 않는다.

## 2-2. resolve와 reject

- `resolve()` : Promise를 성공 상태로 처리한다.
- `reject()` : Promise를 실패 상태로 처리한다.
- Promise를 직접 생성할 때 `new Promise()`를 사용한다.

### 예제

    const promise = new Promise((resolve, reject) => {
        const success = true;

        if (success) {
            resolve('성공');
        } else {
            reject('실패');
        }
    });

- `resolve('성공')`을 호출하면 성공 결과를 전달한다.
- `reject('실패')`를 호출하면 실패 결과를 전달한다.
- 전달된 결과는 `.then()` 또는 `.catch()` 등을 이용해 처리할 수 있다.

## 2-3. Promise 처리 메서드

| 메서드 | 역할 |
|---|---|
| `.then()` | Promise가 성공적으로 처리된 결과를 다룬다. |
| `.catch()` | Promise가 거부되거나 체인에서 오류가 발생했을 때 처리한다. |
| `.finally()` | 성공 또는 실패와 관계없이 마지막에 실행할 작업을 처리한다. |

### 예제

    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
        .finally(() => console.log('작업 종료'));

- `.then()`을 연결해 비동기 작업의 결과를 순서대로 처리할 수 있다.
- `.catch()`로 오류를 처리할 수 있다.
- `.finally()`는 로딩 종료처럼 마지막에 공통으로 처리할 작업에 사용할 수 있다.

## 2-4. Promise는 왜 사용하는가?

- 서버 요청은 응답이 도착하기까지 시간이 걸릴 수 있다.
- 응답이 올 때까지 브라우저 전체를 멈추는 방식은 사용자 경험에 좋지 않다.
- Promise를 사용하면 비동기 작업의 결과가 준비되었을 때 이어서 처리할 수 있다.
- 요청이 진행되는 동안 화면을 그리거나 버튼 클릭, 입력 처리 등 다른 브라우저 작업이 가능하다.

### Promise를 기다리는 동안 할 수 있는 작업 예시
- 로딩 화면 표시
- 사용자의 버튼 클릭 및 입력 처리
- 다른 API 요청 시작
- 웹페이지의 다른 UI 작업 진행

---

# 3. Async / Await

## 3-1. async

- `async`는 함수 앞에 붙이는 키워드이다.
- `async` 함수는 항상 Promise를 반환한다.
- `async` 함수 내부에서 `await`를 사용할 수 있다.
- Promise 기반의 비동기 코드를 읽기 쉽고 순차적인 형태로 작성할 수 있다.

### 예제

    async function callAPI() {
        return '완료';
    }

    callAPI().then(result => console.log(result));

- 함수에서 문자열을 반환하더라도 `async` 함수는 Promise를 반환한다.

## 3-2. await

- `await`는 Promise가 처리될 때까지 기다리는 키워드이다.
- Promise가 성공적으로 처리되면 그 결과를 반환한다.
- `await` 다음에 작성된 코드는 해당 Promise의 처리가 끝난 뒤 실행된다.
- `await`는 일반적으로 `async` 함수 내부에서 사용한다.
- `await`는 현재 async 함수의 실행을 잠시 멈추지만 브라우저 전체를 멈추지는 않는다.

### 예제

    async function callAPI() {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);
    }

### 실행 순서
1. `fetch(url)`로 서버에 요청한다.
2. `await`로 응답이 올 때까지 기다린다.
3. 응답 객체를 `response`에 저장한다.
4. `response.json()`으로 응답 본문을 파싱한다.
5. 파싱된 데이터를 `data`에 저장한다.
6. 데이터를 콘솔에 출력한다.

## 3-3. await를 사용하는 이유

- Promise를 `.then()`으로 연결하는 방식보다 순차적인 코드처럼 작성할 수 있다.
- 비동기 작업의 결과를 변수에 저장해 다음 작업에 사용할 수 있다.
- 여러 비동기 작업을 순서대로 처리할 때 코드의 흐름을 파악하기 쉽다.

### Promise 방식

    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

### async/await 방식

    async function callAPI() {
        try {
            const response = await fetch(url);
            const data = await response.json();

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    callAPI();

- 두 방식 모두 Promise를 기반으로 비동기 작업을 처리한다.
- `async/await`는 Promise를 사용하는 또 다른 문법이다.

## 3-4. try / catch / finally

- `try` : 오류가 발생할 수 있는 코드를 작성한다.
- `catch` : `try`에서 오류가 발생했을 때 처리한다.
- `finally` : 성공 또는 실패와 관계없이 마지막에 실행할 작업을 작성한다.
- `async/await`에서는 `try/catch/finally`를 사용해 비동기 오류와 로딩 상태를 관리할 수 있다.

### 예제

    async function callAPI() {
        try {
            const response = await fetch(url);
            const data = await response.json();

            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            console.log('작업 종료');
        }
    }

---

# 4. Fetch API

## 4-1. Fetch API란?

- `fetch()`는 서버에 HTTP 요청을 보내는 브라우저 내장 API이다.
- 서버에서 데이터를 가져오거나 서버로 데이터를 전송할 때 사용한다.
- `fetch()`는 Promise 객체를 반환한다.
- 서버 응답을 기다릴 때 `await`를 사용할 수 있다.

### 기본 문법

    fetch(url, [options]);

- `url` : 요청할 서버 주소
- `options` : 요청 방식, 헤더, 전송할 데이터 등을 설정하는 선택 인자
- `options`를 생략하면 기본적으로 GET 요청을 보낸다.

## 4-2. fetch()의 반환값

    const promise = fetch(url);

- `promise`에는 서버의 JSON 데이터가 바로 들어가는 것이 아니다.
- `fetch()`는 Promise를 반환한다.
- Promise가 성공적으로 처리되면 Response 객체를 받을 수 있다.

### await를 사용한 응답 처리

    const response = await fetch(url);

- `response`는 서버의 응답 객체이다.
- 응답 상태, 헤더, 본문 등을 다룰 수 있다.
- 아직 파싱된 JSON 데이터 자체는 아니다.

## 4-3. response.json()

    const responseJson = await response.json();

- `response.json()`은 응답 본문을 읽고 JSON을 파싱한다.
- JSON 데이터를 자바스크립트 값(객체, 배열 등)으로 변환한다.
- `response.json()`도 Promise를 반환하므로 `await`를 사용할 수 있다.

### 전체 흐름

    const response = await fetch(url);
    const responseJson = await response.json();

- `fetch()` : 요청하고 Promise 반환
- `await fetch()` : Response 객체를 받음
- `response.json()` : JSON 파싱 Promise 반환
- `await response.json()` : 파싱된 자바스크립트 데이터 획득

## 4-4. 오늘 작성한 Fetch 실습

    async function callAPI() {
        const promise = fetch('https://jsonplaceholder.typicode.com/users');
        console.log(promise);

        console.log(promise['[promiseResult]']);

        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        console.log(response);

        const responseJson = await response.json();
        console.log(responseJson);
    }

    callAPI();

### 실습에서 배운 점
- `fetch()`를 `await` 없이 호출하면 Promise 객체를 반환한다.
- Promise의 내부 결과를 `promise['[promiseResult]']`로 가져오는 것은 공식적인 사용 방법이 아니다.
- Promise의 결과를 사용하려면 `await` 또는 `.then()`을 사용한다.
- `await fetch()`의 결과는 Response 객체이다.
- `await response.json()`의 결과는 파싱된 자바스크립트 데이터이다.
- 같은 URL에 `fetch()`를 두 번 호출하면 요청도 두 번 발생하므로, 한 번의 요청으로 처리할 수 있다.

### 중복 요청을 제거한 코드

    async function callAPI() {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        console.log(response);

        const responseJson = await response.json();
        console.log(responseJson);
    }

    callAPI();

## 4-5. response.ok와 오류 처리

- `response.ok`는 HTTP 응답 상태가 성공 범위(200~299)에 해당하는지 확인하는 값이다.
- `fetch()`는 HTTP 404나 500 응답만으로 자동으로 reject되지 않는다.
- 따라서 `response.ok`를 확인해 HTTP 오류를 직접 처리할 수 있다.

### 예제

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('데이터를 가져오는데 실패했습니다.');
    }

    const data = await response.json();

---

# 5. Axios

## 5-1. Axios란?

- Axios는 HTTP 요청을 보내기 위한 외부 라이브러리이다.
- Fetch와 마찬가지로 Promise 기반으로 동작한다.
- GET, POST 등의 HTTP 요청을 보낼 수 있다.
- Axios는 일반적으로 응답 데이터를 `response.data`로 가져온다.
- Fetch는 `response.json()`으로 응답 본문을 파싱하지만, Axios는 일반적인 JSON 응답을 자동으로 파싱해 제공한다.

### Axios 예제

    const response = await axios.get(url);
    console.log(response.data);

## 5-2. Fetch와 Axios 비교

| 구분 | Fetch | Axios |
|---|---|---|
| 종류 | 브라우저 내장 API | 외부 라이브러리 |
| Promise 기반 | O | O |
| 응답 데이터 | `await response.json()` | `response.data` |
| HTTP 오류 처리 | `response.ok`를 직접 확인 | 기본적으로 2xx 이외 응답을 오류로 처리 |

---

# 6. React 날씨 앱 실습

## 6-1. 실습 목표

- 브라우저의 Geolocation API로 현재 위치를 가져온다.
- 위도(latitude)와 경도(longitude)를 추출한다.
- OpenWeatherMap API에 위치 정보를 전달해 날씨 데이터를 요청한다.
- 응답 데이터를 React state에 저장한다.
- 화면에 지역명, 날씨, 현재 온도, 체감 온도, 풍속을 출력한다.
- 로딩과 오류 상태를 관리한다.

## 6-2. React Hook 가져오기

    const { useState, useEffect } = React;

- `useState` : 컴포넌트의 상태를 관리한다.
- `useEffect` : 컴포넌트 렌더링 이후 API 요청 등 부수 효과를 처리한다.

## 6-3. 상태 관리

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

| 상태 | 역할 |
|---|---|
| `weatherData` | API에서 가져온 날씨 데이터 |
| `loading` | 데이터 요청 중인지 나타냄 |
| `error` | 오류가 발생했을 때 오류 정보 저장 |

- `null`은 아직 데이터나 오류가 없음을 나타낼 수 있다.
- `loading`은 `true` 또는 `false`로 관리한다.
- 상태가 변경되면 React는 컴포넌트를 다시 렌더링한다.

## 6-4. Geolocation API로 현재 위치 가져오기

    const getPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    };

- `navigator.geolocation.getCurrentPosition()`은 브라우저의 현재 위치를 가져오는 API이다.
- 사용자의 위치 권한 허용이 필요하다.
- 위치 정보를 가져오는 작업은 비동기적으로 처리된다.
- `getCurrentPosition()`의 성공 콜백은 위치 정보를 전달하고, 실패 콜백은 오류를 전달한다.
- `new Promise()`로 감싸면 `await getPosition()` 형태로 사용할 수 있다.

### 위치 정보 추출

    const position = await getPosition();
    const { latitude, longitude } = position.coords;

- `position`은 GeolocationPosition 객체이다.
- 위도와 경도는 `position.coords` 안에 있다.
- 구조 분해 할당으로 `latitude`, `longitude`를 꺼낼 수 있다.

## 6-5. OpenWeatherMap API 요청

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );

- `lat` : 위도
- `lon` : 경도
- `appid` : OpenWeatherMap API 키
- `units=metric` : 섭씨 기준의 온도 단위 사용
- 템플릿 문자열을 이용해 변수 값을 URL에 삽입한다.

### 응답 확인 및 JSON 파싱

    if (!response.ok) {
        throw new Error('날씨 정보를 가져오는데 실패');
    }

    const result = await response.json();
    setWeatherData(result);

- `response.ok`로 HTTP 요청의 성공 여부를 확인한다.
- `response.json()`으로 응답 본문을 파싱한다.
- `setWeatherData(result)`로 API 데이터를 state에 저장한다.

## 6-6. try / catch / finally로 요청 관리

    const fetchWeather = async () => {
        try {
            setLoading(true);
            setError(null);

            const position = await getPosition();
            const { latitude, longitude } = position.coords;

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );

            if (!response.ok) {
                throw new Error('날씨 정보를 가져오는데 실패');
            }

            const result = await response.json();
            setWeatherData(result);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

- `try` : 위치 조회와 API 요청 등 오류가 발생할 수 있는 코드를 실행한다.
- `catch` : 오류가 발생하면 오류 정보를 state에 저장한다.
- `finally` : 요청 성공 여부와 관계없이 로딩 상태를 종료한다.
- `setError(null)`로 새로운 요청을 시작할 때 이전 오류를 초기화한다.

## 6-7. useEffect로 최초 API 요청 실행

    useEffect(() => {
        fetchWeather();
    }, []);

- `useEffect()`는 컴포넌트가 처음 마운트될 때 날씨 데이터를 요청하는 데 사용할 수 있다.
- 의존성 배열이 `[]`이면 일반적인 상황에서 최초 마운트 시 실행된다.
- `fetchWeather()`를 호출해 위치 조회 및 날씨 API 요청을 시작한다.

## 6-8. 날씨 데이터 출력

    <h1>{weatherData.name}의 날씨</h1>
    <h4>날씨 : {weatherData.weather[0].main}</h4>
    <h4>현재온도 : {weatherData.main.temp}</h4>
    <h4>체감온도 : {weatherData.main.feels_like}</h4>
    <h4>풍속 : {weatherData.wind.speed}</h4>

- `weatherData.name` : API가 반환한 위치명
- `weatherData.weather[0].main` : 날씨 상태
- `weatherData.main.temp` : 현재 온도
- `weatherData.main.feels_like` : 체감 온도
- `weatherData.wind.speed` : 풍속
- API 응답의 속성명은 대소문자를 구분하므로 `weather`처럼 정확하게 작성해야 한다.

## 6-9. 로딩 / 오류 / 데이터 조건부 렌더링

    if (error) {
        return <div>오류 발생: {error.message}</div>;
    }

    if (loading) {
        return <div>날씨 정보를 불러오는 중...</div>;
    }

    if (!weatherData) {
        return <div>날씨 정보가 없습니다.</div>;
    }

- 오류 상태를 먼저 확인해 오류 메시지가 가려지지 않도록 한다.
- 로딩 중이면 로딩 UI를 보여준다.
- 데이터가 없으면 데이터 없음 UI를 보여준다.
- 데이터가 준비되면 날씨 정보를 출력한다.

### 조건문 순서가 중요한 이유
- `weatherData`가 `null`인 상태에서 `if (!weatherData)`를 먼저 검사하면 오류가 발생해도 '날씨 정보가 없습니다'가 먼저 표시될 수 있다.
- 따라서 `error` → `loading` → `weatherData` 순서로 검사하면 상태별 UI를 명확하게 구분할 수 있다.

## 6-10. 실습 중 확인한 오류와 주의점

- `fetch()`에는 `await`를 붙여 응답 객체를 받아야 한다.
- `weatherData.Weather[0].main`이 아니라 `weatherData.weather[0].main`으로 작성한다.
- `API_URL`을 선언해 놓고 사용하지 않는다면 제거하거나 실제 요청에 활용한다.
- URL에 `{lat}`, `{lon}`처럼 변수 자리를 그대로 두지 않고 실제 변수 값을 전달해야 한다.
- 위도와 경도는 `position.coords.latitude`, `position.coords.longitude`에서 가져온다.
- API 키가 브라우저 코드에 노출되면 다른 사람이 확인할 수 있으므로 공개 저장소에 올리지 않도록 주의한다.
- 실제 API 키가 노출되었다면 키를 재발급하거나 교체하는 것을 권장한다.
- `loading` 초기값은 `null`보다 `false`로 설정하는 것이 상태 관리에 명확하다.

---

# 7. 오늘의 나만의 정리

## 7-1. Promise

Promise는 비동기 작업의 미래 결과를 나타내는 객체이다. 서버 요청처럼 시간이 걸리는 작업의 결과를 기다리고 처리할 때 사용한다. Promise는 `pending`, `fulfilled`, `rejected` 상태를 가지며, `resolve()`는 성공, `reject()`는 실패를 처리한다. `.then()`은 성공 결과, `.catch()`는 오류, `.finally()`는 성공·실패와 관계없이 마지막에 실행할 작업을 처리한다.

## 7-2. async / await

`async`는 함수 앞에 붙이며, 해당 함수는 항상 Promise를 반환한다. `async` 함수 내부에서 `await`를 사용할 수 있다. `await`는 Promise가 처리될 때까지 현재 async 함수의 실행을 잠시 멈추고, 결과를 받은 뒤 다음 코드를 실행하게 해준다. 이때 브라우저 전체가 멈추는 것은 아니며, 비동기 코드를 동기 코드처럼 순차적으로 작성할 수 있다.

## 7-3. Fetch API

`fetch(url, [options])`는 서버에 HTTP 요청을 보내고 Promise를 반환한다. `await fetch(url)`로 Response 객체를 받고, `await response.json()`으로 응답 본문을 파싱해 자바스크립트 데이터로 변환한다. `response.ok`를 확인하면 HTTP 응답의 성공 여부를 검사할 수 있다.

## 7-4. Axios

Axios는 Promise 기반의 HTTP 요청 라이브러리이다. Fetch와 비슷하게 서버와 통신하지만, 일반적으로 응답 데이터를 `response.data`로 바로 사용할 수 있다.

## 7-5. React 날씨 앱

React의 `useState`로 날씨 데이터, 로딩, 오류 상태를 관리하고, `useEffect`로 컴포넌트가 처음 실행될 때 날씨 요청을 시작한다. Geolocation API로 위도와 경도를 가져오고, OpenWeatherMap API에 전달해 날씨 데이터를 받아온다. `async/await`와 `try/catch/finally`로 비동기 요청과 오류, 로딩 상태를 관리한 뒤, 받아온 데이터를 화면에 출력한다.

---

# 8. 오늘의 핵심 암기

- Promise : 비동기 작업의 미래 결과를 나타내는 객체
- `resolve()` : 성공 처리
- `reject()` : 실패 처리
- `async` : Promise를 반환하는 함수 선언
- `await` : Promise가 처리될 때까지 현재 async 함수의 실행을 잠시 멈춤
- `.then()` : 성공 결과 처리
- `.catch()` : 오류 처리
- `.finally()` : 성공·실패와 관계없이 마지막에 실행
- `fetch()` : HTTP 요청을 보내고 Promise 반환
- `await fetch()` : Response 객체 획득
- `response.json()` : 응답 본문을 JSON으로 파싱하는 Promise 반환
- `await response.json()` : 파싱된 자바스크립트 데이터 획득
- Axios : Promise 기반 HTTP 요청 라이브러리
- `useState` : React 상태 관리
- `useEffect` : React 부수 효과 처리
- Geolocation API : 브라우저의 현재 위치 조회
- `try/catch/finally` : 비동기 작업의 오류와 종료 상태 관리

## 한 줄 요약

Promise는 비동기 작업의 미래 결과를 나타내고, async/await는 그 결과를 순차적으로 처리하도록 도와준다. Fetch와 Axios로 서버와 통신하고, React에서는 useState와 useEffect를 활용해 비동기 API 데이터를 화면에 표시할 수 있다.
