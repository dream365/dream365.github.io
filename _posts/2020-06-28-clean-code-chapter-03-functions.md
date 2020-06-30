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

## 서술적인 이름을 사용하라

**길고 서술적인** 이름이 짧고 어려운 이름보다 좋다. **서술적인 이름**을 사용하면 설계가 뚜렷해지므로 코드를 **개선**하기 쉬워진다.

모듈 내에서 함수 이름은 **같은 문구, 명사, 동사**를 사용하자

## 함수 인수

함수에서 이상적인 **인수** 개수는 **0개(무항)**이다. 다음은 **1개(단항)**이고, 그 다음은 **2개(이항)**이다. **3개(삼항)**은 피하고 **4개 이상(다항)**은 쓰지 말자.

### 많이 쓰는 단항 형식

단항 형식은 크게 두 가지로 사용된다.

- 인수에 **질문**을 던지는 경우 i.e. boolean fileExists("MyFile")
- 인수를 뭔가로 **변환**해 **결과**를 **반환**하는 경우 i.e. InputStream fileOpen("MyFile")

### 플래그 인수

**플래그 인수**는 쓰지말자. 대놓고 여러 가지 일을 해당 함수가 한다는 걸 공표하는 일(참이면 이걸하고 거짓이면 저걸하겠다.)

- render(boolean isSuite)보단 renderForSuite()와 renderForSingleTest()로 나누어 쓰자.

### 이항 함수

**이항 함수**는 **단항 함수**보다 이해하기가 어렵다. 따라서, 단항 함수로 바꾸자(예를 들어, 하나의 인수를 클래스 변수로 만들어 인수로 넘기지 않는다던지..)

인수의 **자연적인 순서** 또한 없다. (assertEquals(expected, actual)에서 expected 인수에 actual 값을 넣는 경우)

### 인수 객체 

인수가 2-3개 필요하다면 일부를 **클래스 변수**로 선언할 수 있는지 본다.

### 동사와 키워드

함수의 **의도**나 인수의 **순서와 의도**를 표현하려면 좋은 함수 이름이 있어야 한다.

- 단항 함수에서 writeField(name) -> **'이름(name)'**이 **'필드(field)'**이며 이를 **'쓴다(write)'**라는 내용을 알 수 있다.
- assertEquals 보다 assertExpectedEqualsActual(expected, actual)이 더 좋다. 인수 순서를 알 수가 있다. (함수 이름에 **키워드(인수 이름)**을 추가)

## 부수 효과를 일으키지 마라

**부수 효과**는 **거짓말**이다. 함수에서 **한 가지**를 하겠다고 약속하고선 **다른 짓**을 하는것

```java
public class UserValidator {
	private Cryptographer cryptographer;
	public boolean checkPassword(String userName, String password) { 
		User user = UserGateway.findByName(userName);
		if (user != User.NULL) {
			String codedPhrase = user.getPhraseEncodedByPassword(); 
			String phrase = cryptographer.decrypt(codedPhrase, password); 
			if ("Valid Password".equals(phrase)) {
				Session.initialize();
				return true; 
			}
		}
		return false; 
	}
}
```

위의 함수에서 Session.initialize() 구문을 통해 **부수 효과**를 일으킨다.

함수 이름만 봐서는 password를 체크하는것으로 알 수 있지만 실제 내부에서는 세션을 초기화 한다. 이를 모르고 해당 함수를 단순히 password check 용도로 사용하면 세션이 초기화 되어 다른 위험에 처한다.

## 명령과 조회를 분리하라

함수는 뭔가를 **수행**하거나 뭔가에 **답하거나** 둘 중 하나만 해야 된다.

```java
public boolean set(string attribute, String value);

if (set("username", "sewon"))... // set이 무슨 함수 일까?

if (attributeExists("username")) {
	setAttribute("username", "sewon");
	...
}
```

위의 set 함수는 attribute 속성을 찾아 값을 value로 설정한 후 성공하면 true, 실패하면 false를 반환한다.

하지만, if문 안에 들어가면 해당 함수가 attribute를 value로 설정하는 함수인지, 아니면 설정되어 있는지 확인 하는 함수인지 알기가 힘들다.

따라서, 명령과 조회를 두 개의 함수로 분리해 혼란을 없애자.

## 오류 코드보다 예외를 사용하라

**오류 코드** 대신 **예외**를 사용하면 **오류 처리 코드**가 원래 코드에서 분리되므로 코드가 깔끔해진다.

```java
if (deletePage(page) == E_OK) {
	if (registry.deleteReference(page.name) == E_OK) {
		if (configKeys.deleteKey(page.name.makeKey()) == E_OK) {
			logger.log("page deleted");
		} else {
			logger.log("configKey not deleted");
		}
	} else {
		logger.log("deleteReference from registry failed"); 
	} 
} else {
	logger.log("delete failed"); 
	return E_ERROR;
}
```

위와 같이 오류 코드와 이를 처리하긴 코드를 결합한 형태가 아닌

```java
try {
	deletePage(page);
	registry.deleteReference(page.name);
	configKeys.deleteKey(page.name.makeKey());
} catch(Exception e) {
	logger.log(e.getMessage());
}	
```

이렇게 예외로 처리하자.

### Try/Catch 블록 뽑아내기

**정상 동작**과 **오류 동작**을 뒤섞을 수 있으므로 별도의 함수로 뽑아내자.

```java
public void delete(Page page) {
	try {
		deletePageAndAllReferences(page);
  	} catch (Exception e) {
  		logError(e);
  	}
}

private void deletePageAndAllReferences(Page page) throws Exception { 
	deletePage(page);
	registry.deleteReference(page.name); 
	configKeys.deleteKey(page.name.makeKey());
}

private void logError(Exception e) { 
	logger.log(e.getMessage());
}
```

이렇게 **정상 동작**과 **오류 동작**을 분리하면 코드 **이해**와 **수정**이 쉬워진다.

### Error.java 의존성 자석

**오류 코드**를 반환한다는 것은 어딘가 오류 코드를 enum이나 클래스의 형태로 정의한다는 것이다.

이러한 enum이나 클래스는 의존성 자석이다. 해당 enum이나 클래스가 변경되면 import 해서 사용하는 모든 클래스들을 전부 **재컴파일**하고 **재배치**해야 된다.

하지만, 예외를 사용하게 되면 새 예외는 Exception 클래스에서 파생된것이므로 새로운 예외 클래스를 추가할 수 있다.

## 반복하지 마라

**중복**은 **문제**다. 코드 길이가 늘어나고 수정되면 모든 곳이 다 수정되야 된다.

**중복**을 없애면 **가독성**이 크게 좋아진다.

## 함수를 어떻게 짜죠?

처음에는 길고 복잡하다. 중복도 많고, 인수 목록도 길며 이름은 즉흥적이다. 이러한 서투른 코드에 대해 모두 테스트하는 **단위 테스트 케이스**를 만든다.

이후에 코드를 다듬고, 함수를 만들고, 이름을 재정의 하고, 중복을 제거한다. 이 일중에도 모든 **단위 테스트 케이스**는 통과해야 한다.
