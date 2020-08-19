---
title: "Kotlin: Scoping Function"
categories:
  - Programming Language
tags:
  - Kotlin
author:
  name: Sewon Ko
  picture: /images/sw-profile.png
last_modified_at: 2020-08-19T10:18:00-00:00
---

Kotlin의 **Scoping Function**에 대하여 다루는 post입니다.

## Scoping Function의 속성

### 1. Normal vs extension function

```kotlin
with(webview.settings) {
		javaScriptEnabled = true
		databaseEnabled = true
}

webview.settings.run {
		javaScriptEnabled = true
		databaseEnabled = true
}
```

- 위의 2가지 with, run function은 비슷하다.
    - 하지만 with는 normal function, run은 extension function
- Parameter 혹은 receiver가 되는 webview.setting이 nullable이라면 run이 낫다
    - 아래 예제를 보자

```kotlin
with(webview.settings) {
		this?.javaScriptEnabled = true //모두 ?을 붙여야됨
		this?.databaseEnabled = true
}

webview.settings?.run {
		javaScriptEnabled = true
		databaseEnabled = true
}
```

### 2. This vs it argument

- [T.run](http://t.run) 과 T.let은 인자를 받아들이는 방식만 다르다

```kotlin
stringVariable?.run {
      println("The length of this String is $length")
}
// Similarly.
stringVariable?.let {
      println("The length of this String is ${it.length}")
}
```

- T.run의 경우 단지 T의 extension function(block: T.( ))이므로 this로 호출하여 println 구문에서 this를 생략하여 $this.length가 아닌 $length와 같이 쓸수 있다.
- T.let은 인자를 함수 안으로 넣는다(block: (T)) 따라서 람다 안으로 인자 자체를 넣으므로 it 로 인자를 받는다.
- 이것만 보면 T.run이 T.let의 상위 같아 보이지만 T.let은 다음과 같은 장점을 갖는다.
    - T.let은 scope 안에 주어진 function / member와 scope 밖의 function / scope의 명확한 분리를 해준다
    - 명확한 인자의 이름을 줄 수 있다.(run은 this만 사용함으로)

```kotlin
stringVariable?.let {
		nonNullString ->
		println("The non null string is $nonNullString")
}
```

### 3. Return this vs. other types

- T.let과 T.also를 비교하였을때 let은 구문의 마지막 부분을 return하고 also는 T를 return한다.
- 결론 적으로 let은 chaining에 쓸 수 있고 also는 T만 쓰는 chaining에 사용할 수 있다.

```kotlin
val original = "abc"
// Evolve the value and send to the next chain
original.let {
    println("The original String is $it") // "abc"
    it.reversed() // evolve it as parameter to send to next let
}.let {
    println("The reverse String is $it") // "cba"
    it.length  // can be evolve to other type
}.let {
    println("The length of the String is $it") // 3
}
//먼가 map과 같은 느낌

// Same value is sent in the chain 
original.also {
    println("The original String is $it") // "abc"
}.also {
    println("The reverse String is ${it.reversed()}") // "cba"
}.also {
    println("The length of the String is ${it.length}") // 3
} // original의 value만 사용
```

### Function Selection

![scoping function branches](/images/scoping_function_branches.png)

## Scoping Functions

### Run : fun <T, R> T.run(block: T.() → R): R = block()

```kotlin
fun test() {
		var message = "outside run scope"
	
		run {
				val message = "inside run scope"
				println(message) // inside run scope
		}
		println(message) // outside run scope
}
```

```kotlin
fun printAge(person: Person) = person.run {
		// person만을 사용하는 함수라면 scope function을 사용하면 좋음
		print(age) // run 사용 안한다면 print(person.age) 이렇게 age 사용
}
```

- scope를 나눌때 사용, run 바깥의 scope에서는 run 안의 scope에 포함된 변수 사용 못함
    - 하지만 단순히 scope를 나누는 것 뿐이라면 크게 도움이 될까..?
- 2번째 사용처는 run의 경우 scope의 마지막 구문에 들어있는 부분을 return 함으로 이를 이용하여 사용할 수 있다.
    - OOP의 다형성 feature에서 이용하기 좋을 것 같음
    - 아래의 예제에서 view의 show 함수를 2번 호출하지 않아도 됨

```kotlin
run {
				if (firstTimeView) introView else normalView
}.show()
```

### With : fun <T, R> with(receiver: T, block: T.() → R): R = receiver.block()

- Non-nullable이 수신 객체이며 결과가 필요하지 않을때

```kotlin
val person: Person = getPerson()
with(person) {
    print(name)
    print(age)
}
```

### Let : fun <T, R> T.let(block: (T) → R): R = block(this)

- 지정값이 null이 아닌 경우 코드 실행
- 값을 evolve해야 되는경우(다른 객체로 변환)

```kotlin
getNullablePerson()?.let {
    // null 이 아닐때만 실행됩니다.
    promote(it)
}

val driversLicence: Licence? = getNullablePerson()?.let {
    // nullable personal객체를 nullable driversLicence 객체로 변경합니다.
    licenceService.getDriversLicence(it) 
}
```

### Also : fun <T> T.also(block: (T) → Unit): T { block(this); return this }

- 객체의 사이드 이펙트 확인, 데이터 유효성 검사

```kotlin
class Book(val author: Person) {
    init {
      requireNotNull(author.age)
      print(author.name)
    }
}
```

### Apply : fun <T> T.apply(block: T.() → Unit): T { block(); return this }

- 객체의 초기화

```kotlin
val peter = Person().apply {
    // apply 의 블록 에서는 오직 프로퍼티 만 사용합니다!
    name = "Peter"
    age = 18
}
```
