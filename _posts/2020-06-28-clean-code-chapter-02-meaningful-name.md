---
title: "Clean Code: Chapter 02 Meaningful Names"
categories:
  - Book Review
tags:
  - Clean Code
author:
  name: Sewon Ko
  picture: /images/sw-profile.png
last_modified_at: 2020-06-28T20:10:00-00:00
---

> 더 좋은 프로그램을 작성하기 위하여 깨끗한 코드를 작성하는 방법에 대해 다루는 ***Robert C. Martin***의 ***Clean Code***를 정리하는 post입니다.

![logo](/images/clean-code-cover.png)

{% include toc %}

소프트웨어에는 많은 이름이 들어가 있다.(변수, 함수, 클래스, 모듈, 디렉터리 등)

이렇듯 어디에나 들어 있는 **이름**을 잘 지어야 편하다.

## 의도를 분명히 밝혀라
**좋은 이름**을 지으려면 **시간**이 많이 걸리지만, **좋은 이름**을 지어 놓으면 그것보다 더 많은 **시간**을 **절약**할 수 있다.

```java
int d; // 아무 의미로 들어나지 않는다, 값과 단위를 표현하는 이름을 사용하자

int elapsedTimeInDays;
int daysSinceCreation;
int daysSinceModification;
int fileAgeIndays;
```

아래의 예를 살펴보자.

```java
public List<int[]> getThem() {
    List<int[]> list1 = new ArrayList<int[]>();
  
    for (int[] x : theList)
        if ( x[0] == 4 )
            list1.add(x);
    
    return list1;
}
```

코드는 단순하나, 무엇을 하는지 짐작하기가 어렵다.

1. theList는 무엇을 의미하나?
2. 0번째 원소를 검사하는 이유는?
3. 값 4는 무엇을 의미하나?
4. list1을 반환하는 이유는?

중요한건, 코드의 **단순성**이 아니라 코드의 **함축성**이다.

```java
public List<int[]> getFlaggedCells() {
    List<int[]> flaggedCells = new ArrayList<int[]>();
  
    for (int[] cell : gameBoard)
        if ( cell[STATUS_VALUE] == FLAGGED )
            flaggedCells.add(cell);
    
    return flaggedCells;
}
```

theList를 gameBoard(게임판)으로 바꾸고, 값 4는 깃발이 꽂힌 상태를 표현해보자. 

훨씬, 보기가 나아진다.(**개념**에 **이름**만 붙여도 코드가 훨씬 나아진다.)

## 그릇된 정보를 피하라
프로그래머는 **코드**에 **그릇된 정보**를 남기면 안된다.  

유사한 **개념**은 유사한 **표기법**을 사용하자. 일관성이 떨어지는 표기법은 **그릇된 정보**다.

## 의미 있게 구분하라

**이름**이 달라야 한다면 **의미**도 달라야 한다.

불용어(Info, Data, 연속적인 숫자 등 의미 없는 단어)를 사용하지 말자.

읽는 사람이 **차이**를 알도록 **이름**을 지어야 한다.

## 발음하기 쉬운 이름을 사용하라
모든 **단어**는 발음이 가능하다. 그니깐 쉬운 토론을 위해 **발음하기 쉬운** 이름을 사용하자.

i.e. genymdhms (generate date, year, month, day, hour, minute, second)
- 젠 와이 엠 디 에이취 엠 에스?
- 젠 이 음 드 흠 스?

```java
class DtaRcrd102 {
    private Date genymdhms;
    private Date modymdhms;
    private final String pszqint = "102";
}

class Customer {
    private Date generationTimestamp;
    private Date modificationTimestamp;
    private final String recordId = "102";
}
```

두번째 코드는 지적인 대화가 가능해진다.

## 검색하기 쉬운 이름을 사용하라

**문자 하나를 사용하는 이름**과 **상수**는 검색이 힘들다.

- 숫자 7(상수)를 검색하면 7이 들어가는 모든 파일, 수식이 검색된다.
- e라는 문자를 변수로 사용하여 검색하면 e를 포함하는 모든 단어가 포함된 파일이 검색된다.

## 인코딩을 피하라

이미 이름은 충분히 정보가 많다. 추가적인 인코딩은 **부담**이 될 뿐이다.

- 강타입과 더 똑똑해진 IDE(타입 오류 감지)가 나온 세상에서 헝가리식 표기법, 기타 인코딩 방식은 불필요하다,.
- m_ 과 같은 접두어 또한 불필요하다.
- 인터페이스 이름은 접두어를 붙이지 않는 편이 좋다(ShapeFactoryImp나 CShapeFactory가 IShapeFactory보다 낫다고 생각)

## 자신의 기억력을 자랑하지 마라
문자 하나만 사용하는 변수 등 **자신만 아는 이름**으로 변수를 짓는것은 바람직하지 못하다.

## 클래스 이름

**클래스 이름**은 **명사**나 **명사구**가 적합하다. (Manager, Processor, Data, Info 등과 같은 명료하지 않은 단어, 동사는 피하자)

## 메서드 이름
**메서드 이름**은 **동사**나 **동사구**가 적합하다. (addPage, deleteAccount, save 등)

**접근자(Accessor)**, **변경자(Mutator)**, **조건자(Predicate)**는 javabean 표준에 따라 값 앞에 **get**, **set**, **is**를 붙인다.

## 한 개념에 한 단어를 사용하라

**추상적인 개념** 하나에 **단어 하나**를 선택해 이를 고수한다.(**일관성 있는 어휘**를 사용하자)

- 똑같은 메서드를 클래스마다 fetch, retrieve, get으로 제각각 부르지 말자(주석을 뒤져보지 않고도 프로그래머가 올바른 메서드 선택을 할 수 있어야 한다.)
- 동일 코드 기반에 controller, manager, driver라는 클래스명을 제각각 사용하여 혼란을 주지 말자.(다르게 명명한 기준을 독자는 알지 못한다.)

## 말장난을 하지 마라

**한 단어**를 **두 가지 목적**으로 사용하지 마라. 

**일관성**을 고려해 맥락이 다른 메서드를 같은 이름으로 명명하지 마라.

## 해법 영역에서 가져온 이름을 사용하라, 그 다음 문제 영역에서 가져온 이름을 사용하라

**독자** 또한 프로그래머다. 그러므로 **전산 용어, 알고리즘 이름, 패턴 이름, 수학 용어** 등을 사용해도 괜찮다.

하지만, 적절한 **해법 영역** 용어가 없다면 그 때, **문제 영역(domain)**에서 이름을 가져오자. 그러면 프로그래머가 분야 전문가에게 의미를 물어 파악할 수 있다. (모든 이름을 문제 영역에서 가져오면 매번 그 의미를 물어야 한다.)

## 의미 있는 맥락을 추가하라

스스로 **의미**가 분명한 **이름**은 없다. 따라서 클래스, 함수, 이름 공간에 넣어 **맥락**을 부여 한다. 

- firstName, lastName, street, city, state라는 변수가 있다면, 이 맥락 속에서 state가 주소라는 사실을 알 수있다. 하지만 state 변수 하나만 있다면 알 수가 없다.
- 혹은 Address라는 클래스를 생성하면 더 좋다. 그러면 컴파일러에게도 Address라는 개념에 변수들이 속한다는 것을 알려줄 수 있다.

모든 방법이 실패하면 **접두어**를 붙이자.

- addrFirstName, addrLastName, addrCity, addrState

```java
private void printGuessStatistics(char candidate, int count) {
    String number;
    String verb;
    String pluralModifier;

    if (count == 0) {
        number = "no";
        verb = "are";
        pluralModifier = "s";
    } else if (count == 1) {
        number = "1";
        verb = "is";
        pluralModifier = "";
    } else {
        number = Integer.toString(count);
        verb = "are";
        pluralModifier = "s";
    }

    String guessMessage = String.format(
        "There %s %s %s%s", verb, number, candidate, pluralModifier);

    print(guessMessage);
}
```

위의 예제에서 함수를 끝까지 읽어 보아야 number, verb, pluralModifier 변수가 **'통계 추측'** 메시지에 사용된다는 사실을 알 수 있다. 독자는 코드를 읽어 그 **맥락**을 유추해야 한다.

또한 세 변수를 함수 전반에서 사용한다. 함수를 작은 조각으로 쪼개어 **GuessStatisticsMessage**라는 클래스를 만든 후 해당 클래스에 넣어 사용하자. 그렇게 하면 세 변수의 **맥락**이 분명해지고, 함수를 쪼개기가 쉬워지므로 알고리즘도 좀 더 **명확**해진다.

```java
public class GuessStatisticsMessage {
    private String number;
    private String verb;
    private String pluralModifier;

    public String make(char candidate, int count) {
        createPluralDependentMessageParts(count);
        return String.format("There %s %s %s%s", verb, number, candidate, pluralModifier );
    }

    private void createPluralDependentMessageParts(int count) {
        if (count == 0) {
            thereAreNoLetters();
        } else if (count == 1) {
            thereIsOneLetter();
        } else {
            thereAreManyLetters(count);
        }
    }

    private void thereAreManyLetters(int count) {
        number = Integer.toString(count);
        verb = "are";
        pluralModifier = "s";
    }

    private void thereIsOneLetter() {
        number = "1";
        verb = "is";
        pluralModifier = "";
    }

    private void thereAreNoLetters() {
        number = "no";
        verb = "are";
        pluralModifier = "s";
    }
}
```

## 불필요한 맥락을 없애라
그 의미가 분명한 경우에는 **짧은 이름**이 **긴 이름**보다 좋다.

- accountAddress, customerAddress는 Address 클래스 인스턴스로 좋은 이름이다.
- Address는 클래스 이름으로써 좋은 이름이다.