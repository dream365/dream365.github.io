---
title: "FP: Lazy Loading"
categories:
  - Functional Programming
tags:
  - Functional Programming
  - C#
  - F#
  - Clojure
author:
  name: Sewon Ko
  picture: /images/sw-profile.png
last_modified_at: 2020-06-16T14:25:52-05:00
---

**[Functional Progamming 시리즈 목차](https://dream365.github.io/functional%20programming/fp-content/){: .btn .btn--primary}**<br>

함수형 프로그래밍의 Lazy Loading에 대하여 다룹니다.
<!--more-->

# Lazy
필요(요구)할떄 결과를 계산하는 방식입니다.  
필요할때 객체를 생성하면 Lazy Initialization  
필요할때 식을 평가하면 Lazy Evaluation  
 

### 장점
처음에 모든것을 초기화하는데 장시간 소요되는것을 막습니다.
무한한 리스트를 생성할 수 있습니다.

### 단점
필요할때 마다 계산을 요합니다. (단 자주쓰이는 경우 메모지에이션이 가능합니다.)
지연과 즉시중에 좋은 경우를 골라 잘 사용해야합니다.

____
## Example
#### C++
C++의 경우 Lazy 리스트를 지원하지는 않으나 클래스 객체를 만들때 연산자 오버로딩등을 통하여 지연되게 생성 시킬 수 있습니다.

#### C#
```csharp
// IEnumerable 과 yield 키워드를 통하여 Lazy 하게 구현할수있습니다.
// Lazy Init 을 위해 Lazy<T> 클래스를 제공합니다.
```

#### F#
```fsharp
// Lazy 키워드를 제공합니다.
let x = 10
let result = lazy (x + 10)
printfn "%d" (result.Force()) //Force 는 한번만 실행됩니다.
//이는 C# 의 Lazy<T> 클래스로 구현됩니다.

// Sequence (seq) 를 제공합니다.
// Seq는 c# 에서 IEnumberable 에 해당합니다.
// 무한 시퀀스도 만들수 있습니다.
let seqInfinite =
    Seq.initInfinite (fun index ->
        let n = float (index + 1)
        1.0 / (n * n * (if ((index + 1) % 2 = 0) then 1.0 else -1.0)))

printfn "%A" seqInfinite
    
```

#### clojure
```clojure
;lazy 함수가 존재합니다 (lazy-seq)
;Clojure는 완전히 lazy한 것이 아니며 map, reduce, filter 또는 반복과 같은 대부분의 시퀀스 작업 만 lazy 합니다.
;clojure 의 range는 lazy 한 무한 시퀀스입니다.
;dorun 과 doall 등의 키워드를 통하여 realize 할수있습니다. (F#의 포스와 비슷합니다)

;map   filter   remove   range   take   take-while   drop   drop-while
;repeat    iterate    cycle 등..

```