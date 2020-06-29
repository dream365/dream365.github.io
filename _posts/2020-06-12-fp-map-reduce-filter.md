---
title: "FP: Map & Reduce & Filter"
categories:
  - Functional Programming
tags:
  - C++
  - C#
  - F#
  - Clojure
author:
  name: Sewon Ko
  picture: /images/sw-profile.png
last_modified_at: 2020-06-12T14:25:52-05:00
---

함수형 프로그래밍의 고차함수(Map & Reduce & Filter)에 대하여 다룹니다.    

**[Functional Progamming 시리즈 목차](https://dream365.github.io/functional%20programming/fp-content/){: .btn .btn--primary}**<br>    

# Map Reduce Filter
함수를 파라미터로 받아서 실행하거나 함수를 리턴해주는 함수를 고차함수라고 합니다. 
Map Reduce Filter는 FP 에서 기초적이면서 가장 자주 사용하는 고차함수들입니다.  

### Map
시퀀스의 각 요소를 다른 값으로 매핑 시키는 함수

### Filter
시퀀스에서 특정 조건의 요소만 필터링 하는 함수

### Reduce 
시퀀스의 값들을 특정 계산법을 통하여 하나의 값으로 리턴해주는 함수

![ex](/images/map-reduce-filter.jpg)


____
## Example
#### C++
```c++
    std::vector<int> seq = { 1,2,3,4,5 };

    std::vector<int> mapped_seq;
    std::vector<int> filtered_seq;
    int reduced_value;
    std::transform(seq.begin(), seq.end(), mapped_seq.begin(), [](const auto& x) {return x * x; });
    std::copy_if(mapped_seq.begin(), mapped_seq.end(), filtered_seq.begin(), [](const auto& x) {return x%2 == 0; });
    reduced_value = std::accumulate(filtered_seq.begin(), filtered_seq.end(), 0 , [](const auto& x, const auto& y) {return x + y; });

```

#### C#
```csharp
//System.Linq 추가
 var value = seq.Select(x => x*x)    //map
                .Where(x => x%2 == 0)           //filter
                .Aggregate((x,y) => x+y );      //reduce
```

#### F#
```fsharp
let seq = [|1;2;3;4;5|]
let value = seq
            |> Seq.map (fun x -> x*x)
            |> Seq.filter (fun x -> x%2 = 0)
            |> Seq.reduce (fun x y -> x+y)
```

#### clojure
```clojure

(defn ex [] 
  (reduce + (
             filter #(= 0 (mod %1 2))
              (map #(* %1 %1) seq))))

(defn ex2 []
  (->> seq
  (map #(* %1 %1))
  (filter #(= 0 (mod %1 2)))
  (reduce +))
)          ; ->> 매크로 사용해서 순서를 변경
```
