---
title: "FP: Currying"
categories:
  - Functional Programming
tags:
  - C++
  - C#
  - F#
  - Clojure
  - Kotlin
  - Scala
author:
  name: Sewon Ko
  picture: /images/sw-profile.png
last_modified_at: 2020-06-16T14:25:52-05:00
---

함수형 프로그래밍의 커링(Currying)에 대하여 다룹니다.    

**[Functional Progamming 시리즈 목차](https://dream365.github.io/functional%20programming/fp-content/){: .btn .btn--primary}**<br>                

# Currying
하나 이상의 파라미터를 받는 함수에서 몇몇 파라미터를 미리 지정하여 새로운 함수로써 사용하는것입니다.  
(본 설명에서는 Currying 과 Partial function 에 차이를 두지않습니다)
Currying 이 언어적 차원에서 적용되는경우 fun(1,2,3) 은 fun(1)(2)(3) 처럼 처리됩니다.

### 장점
중간함수를 작성할 필요가 없어서 편합니다.
함수의 지연실행이 가능합니다.
함수합성에서 파라미터를 하나만 받는 함수꼴로 변경됩니다.


### 단점
파라미터 갯수에 따라 Pipe 연산자 미지원 시 타이핑 양이 많고 괄호수가 많아질 수 있습니다.

____
## Example
C++/C# 은 언어적 차원의 지원이라기보다는 비슷하게 동작하도록 람다 함수 (클로져)를 새로 만든것에 불가합니다.

#### C++
```c++
bool is_item_in_vector(int x, std::vector<int> list)
{
	for (auto& i : list)
	{
		if (i == x)
		{
			return true;
		}
	}
	return false;
}

int main()
{
	std::vector<int> v = { 1,2,3,4,5 };
	auto is_item_in_v = [v](int x) {return is_item_in_vector(x, v); };

	std::cout << is_item_in_v(1) << std::endl;	//true
	std::cout << is_item_in_v(10) << std::endl;	//false
}
```

#### C#
```csharp
static bool IsItemInList(int x, List<int> list)
{
    return list.FindIndex( i => i == x) != -1;
}
static void Main(string[] args)
{
    List<int> seq = new List<int> { 1, 2, 3, 4, 5 };
    Func<int, bool> IsItemInSeq = (int x) => { return IsItemInList(x, seq); };
    Console.WriteLine(IsItemInSeq(1));
    Console.WriteLine(IsItemInSeq(10));
}
```

#### F#
```fsharp
let IsItemInlist list x = 
    Seq.tryFind (fun i -> i = x) list

[<EntryPoint>]
let main argv =
    let v = [|1;2;3;4;5|]
    let IsItemInV = IsItemInlist v  //real automatic currying
    let IsItemInV2 = (fun i -> IsItemInlist v i)
    printfn "%A" (IsItemInV 5).IsSome
    printfn "%A" (IsItemInV 10).IsSome
    printfn "%A" (IsItemInV2 5).IsSome
    printfn "%A" (IsItemInV2 10).IsSome
    
```

#### clojure
```clojure
(def seq [1 2 3 4 5])

(defn isItemInList [list x]
  (some  #(= % x) list ))

(defn partial-fun [x]
  ((partial isItemInList seq) x))
```

#### kotlin
```kotlin
    val listA: List<Int> = listOf(1, 2, 3, 4, 5)
    val IsItemInList: (Int, List<Int>) -> Boolean = { x: Int, list: List<Int> -> list.contains(x) }
    val IsItemInListA: (Int) -> Boolean = { x: Int -> IsItemInList(x, listA) }

    println(IsItemInListA(1)) // true
    println(IsItemInListA(10)) // false
```

#### scala
```scala
    val listA = List(1, 2, 3, 4, 5)
    val IsItemInList = (x: Int, list: List[Int]) => list.exists(element => element == x)
    val IsItemInListA = (x: Int) => IsItemInList(x, listA)

    println(IsItemInListA(1)) // true
    println(IsItemInListA(10)) // false
```