---
title: "FP: Introduction"
categories:
  - Functional Programming
tags:
  - Functional Programming
  - Kotlin
author:
  name: Sewon Ko
  picture: /images/sw-profile.png
last_modified_at: 2019-12-23T14:25:52-05:00
---

## Functional Programming?
함수형 프로그래밍은 하나의 패러다임(프로그램을 구성하는 스타일)입니다.  <!--more-->
프로그래밍의 상태와 이를 변경하는 구문에 관해, 어떤 식(How)으로 동작을 시킬지 명령을 나열하는 **명령형 프로그래밍**과 달리 상태를 갖지 않고 수학 함수와 같이 입력과 출력의 관계를 정의하고 이러한 함수를 결합하여 프로그램이 무엇(What)과 같은지를 표현하는 **선언형 프로그래밍**입니다.


## 상태를 갖지 않는다?
위에서 언급한 바와 같이 수학 함수의 경우 하나의 입력은 하나의 출력을 보장합니다. 즉, 프로그램 언어에서 파라미터가 있는 함수의 파라미터에 어떤 입력값이 와도 같은 출력값을 리턴해줍니다. 

$$ f(x) = x^2 + x $$ 

f(3) is always 12

```kotlin
fun fx(x: Int): Int {
  return x * x + x // 외부 상태를 참조하지 않습니다.
}
```

하지만 일반적인 명령형 프로그래밍의 경우 외부 상태를 참조하고 이를 어떻게 변경하여 다른 상태들과의 상호작용을 할지 정하기 때문에 가변적인 상태에 따라 같은 입력값이 와도 같은 출력을 보장하지 못합니다.

```kotlin
fun stateFx(x: Int, s: Status): Int = when(s) {
  Status.GOOD -> 0 // 외부 상태를 참조하고 이에 따라 출력 값이 정해집니다.
  Status.BAD -> 1
  else -> 2 
}
```

이러한 함수형 프로그래밍은 다음과 같은 이점을 얻습니다.
* 가독성이 좋아지고, 로직에 집중할 수 있습니다.
  * 외부 상태를 참조하지 않기 때문에 더 쉽게 이해가 가능하며 간결해집니다. 또한 로직에 더욱 집중할 수 있으며, 테스트시에도 다른 유기 관계를 신경쓰지 않아도 됩니다.
* 상태 관리를 독립시키고, Side Effect를 없앤다.
  * 상태 관리를 상태를 갖지 않는 함수로써 독립시키며, 상태를 갖지 않기 때문에 Side Effect를 차단할 수 있습니다.
* 동시성에 안전해집니다.
  * 동시성 상황에서 여러 상태 속에서 [race condition](https://ko.wikipedia.org/wiki/%EA%B2%BD%EC%9F%81_%EC%83%81%ED%83%9C)과 같은 위험한 상황이 벌어질 수 있음과 달리 가변 상태에 의존하지 않아 동시성을 안전하게 처리할 수 있습니다.
