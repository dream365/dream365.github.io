---
title: "Clean Code: Chapter 03 Functions"
categories:
  - Book Review
tags:
  - Clean Code
author:
  name: Sewon Ko
  picture: /images/sw-profile.png
last_modified_at: 2020-06-30T19:31:00-00:00
---

> 더 좋은 프로그램을 작성하기 위하여 깨끗한 코드를 작성하는 방법에 대해 다루는 ***Robert C. Martin***의 ***Clean Code***를 정리하는 post입니다.

![logo](/images/clean-code-cover.png)

{% include toc %}

어떤 프로그램이든 가장 기본적인 단위가 **함수**다.

이번 장에서는 어떤 **함수**가 좋은 함수 인지에 대해서 알아본다.

- **읽기 쉽고 이해하기 쉬운** 함수는 어떤 함수 일까?
- **의도**를 분명히 표현하는 함수는 어떻게 구현할까?
- 함수에 어떤 **속성**을 부여해야 독자로 하여금 직관적으로 파악 할 수 있을까?

## 작게 만들어라

**함수**를 만드는 규칙은 **작게, 또 더 작게**이다. **함수**를 최대한 쪼개고 명백하게 **의도**를 표현하는 함수를 만들자.

```java
public static String renderPageWithSetupsAndTeardowns( PageData pageData, boolean isSuite) throws Exception {
	boolean isTestPage = pageData.hasAttribute("Test"); 
	if (isTestPage) {
		WikiPage testPage = pageData.getWikiPage(); 
		StringBuffer newPageContent = new StringBuffer(); 
		includeSetupPages(testPage, newPageContent, isSuite); 
		newPageContent.append(pageData.getContent()); 
		includeTeardownPages(testPage, newPageContent, isSuite); 
		pageData.setContent(newPageContent.toString());
	}
	return pageData.getHtml(); 
}
```

 위 코드도 길다. 더 짧게(2줄 ~ 5줄)로 줄이자.
 
 ```java
public static String renderPageWithSetupsAndTeardowns( PageData pageData, boolean isSuite) throws Exception { 
	if (isTestPage(pageData)) 
		includeSetupAndTeardownPages(pageData, isSuite); 
	return pageData.getHtml();
}
```

### 블록과 들여쓰기

if / else / while문 안에 들어가는 **블록**은 **한 줄**로 만들자. (함수에서 들여쓰기 수준은 1단이나 2단을 넘어서면 안 된다.)

## 한 가지만 해라

**함수는 한가지를 해야 한다. 그 한가지를 잘 해야 한다. 그 한 가지만을 해야 한다.**

하지만, 그 **한 가지**의 범위를 알기가 힘들다. 따라서, 지정된 **함수 이름** 아래에서 **추상화 수준**이 하나인 단계만 수행하는 함수를 만들자.

함수가 **한 가지**만 하는지 판단하는 방법이 하나 더 있다. **의미 있는 이름**으로 다른 함수를 **추출**할 수 있다면 그 함수는 **여러 작업**을 하는 것이다.

## 함수 당 추상화 수준은 하나로

함수가 확실히 **한 가지**작업만 하려면 함수 내 모든 문장의 **추상화 수준**이 **동일**해야 한다.

- getPage()는 추상화 수준이 아주 **높다.**
- String resourcePath = PathParser.findPath(imgResource);는 추상화 수준이 **중간**이다.
- .append("\n")은 추상화 수준이 아주 **낮다.**

한 함수내에서 **여러 추상화 수준**이 있으면 **근본 개념**인지 **세부 사항**인지 헷갈린다. 이를 뒤섞으면 깨어진 창문처럼 해당 함수에 **세부사항**을 점점 추가한다.

### 위에서 아래로 코드 읽기:**내려가기** 규칙

코드는 **위**에서 **아래**로 **이야기**처럼 읽혀야 좋다.

**내려가기** 규칙 : 한 함수 다음에는 **추상화 수준**이 한 단계 낮은 함수가 온다.(즉, 위에서 아래로 읽으면 **함수 추상화 수준**이 한번에 한 단계씩 낮아진다.

## Switch 문

**switch 문**은 작게 만들기 어려우며, 이러한 **switch 문**을 완전히 피할 방법은 없으므로, **다형성**을 이용해 저차원 클래스에 숨기고 반복하지 않게 만들자.

```java
public Money calculatePay(Employee e) throws InvalidEmployeeType {
	switch (e.type) { 
		case COMMISSIONED:
			return calculateCommissionedPay(e); 
		case HOURLY:
			return calculateHourlyPay(e); 
		case SALARIED:
			return calculateSalariedPay(e); 
		default:
			throw new InvalidEmployeeType(e.type); 
	}
}
```

문제점

- 함수가 **길다.**
- 함수가 **한 가지**작업만 수행하지 않는다.
- **SRP(Single Responsibility Principle)**을 위반한다.
- **OCP(Open Closed Principle)**을 위반한다.
- 더 큰 문제점은 위 함수와 구조가 동일한 함수가 무한정 존재 할 수 있다.(저런 switch문이 무한정 생길 수 있다.)

해결법
**switch 문**을 딱 **추상 팩토리**에 숨기고, 적절한 Employee **파생 클래스**의 인스턴스를 생성한다.(이렇게 하면 딱 한번만 switch 문을 생성할 수 있다.)

calculatePay, isPayday, deliverPay는 Employee 인스턴스에 의해 호출된다.

```java
public abstract class Employee {
	public abstract boolean isPayday();
	public abstract Money calculatePay();
	public abstract void deliverPay(Money pay);
}
-----------------
public interface EmployeeFactory {
	public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType; 
}
-----------------
public class EmployeeFactoryImpl implements EmployeeFactory {
	public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType {
		switch (r.type) {
			case COMMISSIONED:
				return new CommissionedEmployee(r) ;
			case HOURLY:
				return new HourlyEmployee(r);
			case SALARIED:
				return new SalariedEmploye(r);
			default:
				throw new InvalidEmployeeType(r.type);
		} 
	}
}
```
