# YeongduMusic
DS Audio가 못생겨서 만들어 보는 React Native Project

Android 위주로 개발하고 있습니다.

시,,놀로지,,는,,,,,각성,,하라,,,!

## 실행 방법
```
npm install
```
이후에 RNMusicMetadataPackage.java를 찾아서 
```java
// @Override → Override를 주석처리 해 주세요.
public List<Class<? extends JavaScriptModule>> createJSModules() {
    return Collections.emptyList();
}
```
다음과 같은 과정을 진행 해 주세요.

## 개발 사항

### 현재까지 구현된 기능
* 파일 탐색
* 음악 재생 디렉토리 추가
* 추가된 디렉토리 기반으로 음악 탐색


### 개발 중인 기능
* 음악 재생

## 사용된 기술들
* React Native
* Redux
* Realm
* Typescript(?)
