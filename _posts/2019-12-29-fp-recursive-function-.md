---
title: "FP: Recursive Function"
categories:
  - Functional Programming
tags:
  - Kotlin
  - Scala
author:
  name: Sewon Ko
  picture: /images/sw-profile.png
last_modified_at: 2019-12-29T14:25:52-05:00
---

함수형 프로그래밍에서 반복문 형식의 처리와 관련한 recursive function과 tail recurtion에 대하여 다룹니다.    

**[Functional Progamming 시리즈 목차](https://dream365.github.io/functional%20programming/fp-content/){: .btn .btn--primary}**<br>    

# Recursive Function 
재귀 함수는 함수를 구현할 때 자기 자신을 반복적으로 호출하여 반복문과 같이 표현하는 함수를 말합니다. 반복문의 경우 더 많은 변수와 이것들로 인해 발생하는 상태를 관리해야 함으로 함수형 프로그래밍 패러다임과는 다소 맞지 않으며, 변수가 줄어들고 좀 더 직관적인 코드를 작성할 수 있기 때문에 때문에 가독성이 좋아집니다. 함수형 프로그래밍에서는 이러한 반복문과 같은 형태의 코드를 작성하기 위하여 일급 함수를 재귀적으로 호출하여 사용합니다.  

하지만, 함수를 호출하면 함수의 주소값은 스택에 쌓이게 되며 재귀 함수의 경우 반복적으로 스택에 메모리가 쌓이기 때문에 반복문에 비해 많은 메모리가 필요하며, 최악의 경우 스택 오버플로우가 나는 상황까지 생길 수 있습니다. 또한 스택 프레임을 구성하는 오버헤드가 더해져 반복문에 비해 성능도 좋지 않습니다.  

아래의 예제에서는 팩토리얼을 각각 반복문과 재귀 함수로 구현하고 비교해보도록 하겠습니다.

### 장점
- 가독성이 좋아집니다.
- 변수와 상태가 줄어듭니다.

### 단점
- 메모리가 많이 듭니다.
- 성능이 반복문에 비해 좋지 않습니다.

---
## Example
#### KOTLIN
```kotlin
//반복문
fun factorial(val n: Int): Int {
    var res: Int = 1
    for(num in (1..n)) 
        res = res * num
    return res
}

fun recursiveFactorial(val n: Int): Int {
    if(n == 1)
        return n
    else 
        return n * recursiveFactorial(n - 1)
```

반복문을 사용한 구현의 경우 for문 안의 변수를 증가시키며 해당 변수를 사용하여 값을 계산해 나가는 것과 달리 재귀 함수의 경우 파라미터로 들어오는 숫자(불변)와 재귀 함수를 사용하여 값을 계산해 나갑니다.

---
# Tail Recursion
위의 예제를 기준으로 재귀의 문제를 설명하도록 하겠습니다.  
rf(5)의 상황에서 결과 값이 도출되는 함수 호출의 흐름은 아래와 같습니다.(recursiveFactorial함수를 줄여서 rf로 표현하겠습니다.)   
rf(5)  
= 5 * rf(4)  
= 5 * (4 * rf(3))  
= 5 * (4 * (3 * rf(2)))  
= 5 * (4 * (3 * (2 * rf(1))))
= 5 * (4 * (3 * (2 * 1)))
= 120

위와 같이 총 5번의 함수가 호출되며 호출에 따라 스택 프레임이 구성되고 메모리를 잡아 먹게 됩니다. 또한 결과 도출을 위한 표현식이 추가적으로 붙게 됩니다(5, 5 * 4, 5 * 4 * 3...)  
꼬리 재귀는 이러한 문제를 해결하기 위해 논리적으로 마지막 호출 시점에 표현식을 포함하지 않는 재귀 함수 자체만을 반환하여, 컴파일러가 이를 반복문과 같이 최적화하여 함수 호출시 쌓이게 되는 스택 리소스를 아끼게됩니다.  
최종적으로 꼬리 재귀로 구현시 팩토리얼의 결과 도출 까지의 함수 호출의 흐름은 아래와 같게 됩니다.  
tailrf(5, 1)  
= tailrf(4, 5)  
= tailrf(3, 20)  
= tailrf(2, 60)  
= tailrf(1, 120)  
= 120  

이와 같이 기존 재귀의 표현식을 불변 값으로써 파라미터에 추가로 넘겨주어 추가적인 표현식 없이 매번 같은 형식의 재귀 함수로써의 반환을 가능하게 합니다.

### 장점
- 재귀 함수의 단점을 없애줍니다.

### 단점
- 개발자가 꼬리 재귀로 함수를 바꾸어 작성해야 합니다.
- 컴파일러단에서의 지원이 필요합니다.

---
## Example
#### KOTLIN
```kotlin
//trailrec 키워드를 이용하여 꼬리재귀를 지원합니다.
tailrec fun factorial(val n: Int, val prvNum: Int): Int {
    if(n == 1)
        return prvNum
    else 
        return factorial(n - 1, n * prvNum)
```

#### SCALA
```scala
//tailrec annotation을이용하여 꼬리재귀를 지원합니다.    
@tailrec
def factorial(n: Int, prvNum: Int = 1): Int = {
  if(n == 1)
      prvNum
  else
      factorial(n-1, n * prvNum)
}
```
