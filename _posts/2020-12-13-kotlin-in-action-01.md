---
title: "Kotlin: What and Why"
categories:
  - Book Review
tags:
  - Kotlin
author:
  name: Sewon Ko
  picture: /images/sw-profile.png
last_modified_at: 2020-12-13T20:07:00-00:00
---

> 코틀린에 대한 기본적인 이해를 돕고 더 심화된 언어의 특징을 배우기 위한 ***Kotlin in action***을 정리하는 post입니다.

![logo](/images/kotlin-in-action.png)

{% include toc %}

## 주요 특성
----
### 대상 플랫폼 : 서버, 안드로이드 등 자바가 실행되는모든곳

- **자바**가 사용되는 모든 **용도에 적합**하면서도 더 **간결**하고 **생산적**이며 **안전한** 대체 언어를 제공하는 것이 코틀린의 목적
- 서버, 안드로이드 및 ios, 데스크탑, 웹에서까지 사용이 가능하다.
    - 목표 영역이 광범위 하다.

### 정적 타입 언어

- 정적 타입 지정?
    1. 프로그램 구성 요소의 **타입**을 **컴파일 시점**에 알 수 있다
    2. 프로그램 안에서 객체의 **필드**나 **메소드**를 사용할 때마다 컴파일러가 **타입을 검증**해준다.
- 타입 추론
    - 코틀린 컴파일러가 문맥으로 부터 **변수 타입**을 자동으로 **유추** 하여 **타입 선언 생략**이 가능하다.
- 장점
    - 성능 : 실행 시점에 어떤 메소드를 호출할지 알아내는 과정이 필요 없어 메소드 호출이 더 빠르다
    - 신뢰성 : 컴파일러가 프로그램의 정확성을 검증하기 때문에 실행 시 프로그램이 오류로 중단될 가능성이 더 적어진다.
    - 유지 보수성 : 코드의 객체가 어떤 타입에 속하는지 알 수 있어 처음 보는 코드를 다룰 때도 더 쉽다.
    - 도구 지원 : 더 안전하게 리팩토링 할 수 있고, IDE의 다른 지원 기능도 더 잘 만들 수 있다.
- 코틀린 만의 특징
    - **널이 될 수 있는 타입** 지원을 통한 컴파일 시점에 NPE 여부 검사하여 **신뢰성**을 높인다.
    - **함수 타입**의 지원

### 함수형 프로그래밍과 객체지향 프로그래밍

- 함수형 프로그래밍의 핵심 개념
    - **일급 시민(first-class) 함수** : 함수를 **일반 값처**럼 다룰 수 있다.
        - 함수를 변수에 저장
        - 함수를 인자로 다른 함수에 전달
        - 함수에서 새로운 함수를 만들어 반환
    - **불변성(immutability)** : 함수형 프로그래밍에서는 일단 만들어지고 나면 내부 상태가 바뀌지 않는 **불변 객체**를 사용해 프로그램을 작성한다.
    - **부수 효과(side effect) 없음** : 함수형 프로그래밍에서는 입력이 같으면 항상 같은 출력을 반환하고 다른 객체의 상태를 변경하지 않으며, 함수 외부나 다른 바깥 환경과 상호작용하지 않는 **순수 함수**를 사용한다.
- 함수형 프로그래밍의 장점
    1. 간결성 : **명령형 코드**에 비해 더 간결하다. 함수를 값처럼 사용할 수 있기 때문에 더 강력한 **추상화**를 할 수 있고 이를 통해 **코드 중복**을 막을 수 있다.
    2. 다중 스레드에서 안전 하다 : 불변 데이터 구조와 순수 함수를 적용하기 때문에 여러 스레드가 그 상태를 변경할 수 없다.
    3. 테스트하기 쉽다 : 상태를 준비 하는 setup 코드 없이 순수 함수를 사용하여 독립적으로 side effect 없이 테스트 할 수 있다.
- 코틀린에서 제공해주는 함수형 프로그래밍
    - 함수 타입의 지원
    - 람다 식의 지원
    - 데이터 클래스를 통한 불변적인 값 객체 생성
    - 코틀린 표준 라이브러리는 함수형 스타일을 API의 형태로 제공한다.
- 중요한 점은 코틀린은 함수형 스타일로 프로그램을 짤 수 있게 해주지만 이를 강제하지 않는다.
    - OOP(객체 지향 프로그래밍)과 FP(함수형 프로그래밍)을 함께 조합하여 문제를 해결할 수 있다.

## 코틀린의 철학
----
- 코틀린은 **실용적**이고 **간결**하며 **안전한** 자바와의 **상호운용성**에 초점을 맞춘 언어

### 실용성

- 다양한 문제를 해결하기 위한 실용적인 언어로 다른 언어가 채택한 이미 성공된 검증된 해법과 기능에 의존한다.
- IDE 차원에서 강력한 언어 지원을 받을 수 있다.([Intellij](https://www.jetbrains.com/idea/))

### 간결성

- 코드를 더 간단하고 간결하게 만들면 코드의 내용 파악이 쉬워진다.
    - 프로그램에 꼭 넣어야 하는 부수적인 요소를 줄이기 위한 많은 특징을 제공한다.
        - 게터, 세터, 생성자 파라미터를 통한 필드 대입 등을 묵시적으로 제공한다.
        - 명시적으로 작성해야 하는 코드를 줄여 준다.
    - 다양한 라이브러리 함수를 제공함으로 반복되거나 길어지는 코드를 함수 호출로 대치 할 수 있다.

### 안전성

- 더 큰 안전성을 얻기 위해서는 프로그램에 더 많은 정보를 덧붙여야 하므로 생산성과 안전성 사이에는 **Trade-Off** 관계가 성립한다.
- 코틀린은 자바보다 더 높은 안전성은 얻되 생산성에서의 비용은 적게 지불하는데에 초점
    - JVM을 사용해 실행산다는것에서 커다란 안전성을 보장받는다.
        - 메모리 안전성
        - 버퍼 오버플로 방지
        - 동적 할당 메모리의 오사용을 통한 문제 예방
        - 정적 타입 지정 언어를 통한 타입 안전성
    - 널이 될 수 있는 타입 지원을 통한 컴파일 타임의 NPE 예방

### 상호운용성

- **자바 메소드를 호출**하거나 **자바 클래스를 상속**하거나 **인터페이스를 구현**하거나 **자바 애노테이션**을 코틀린 코드에 **적용**할 수 있다.
- 반대로, 코틀린의 클래스나 메소드를 일반적인 자바 클래스나 메소드에서 사용할 수  있다.
- 기존 자바 라이브러리를 최대한 활용하여 라이브러리를 제공하고 이를 확장해줄 뿐이다.



