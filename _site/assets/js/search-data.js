var store = [{
        "title": "Functional Programming Contents",
        "excerpt":"Functional programming posts 1. Introduction 2. Lambda 3. Map, Reduce, Filter 4. Recursive Function 5. Currying 6. Memozation 7. Lazy Loading 8. Option &amp; Either Class 9. Pattern Matching &amp; Destruction ","categories": ["Functional Programming"],
        "tags": [],
        "url": "https://dream365.github.io/functional%20programming/fp-content/"
      },{
        "title": "FP: Introduction",
        "excerpt":"함수형 프로그래밍에 대한 소개 포스팅입니다. Functional Progamming 시리즈 목차 Functional Programming? 함수형 프로그래밍은 하나의 패러다임(프로그램을 구성하는 스타일)입니다. 프로그래밍의 상태와 이를 변경하는 구문에 관해, 어떤 식(How)으로 동작을 시킬지 명령을 나열하는 명령형 프로그래밍과 달리 상태를 갖지 않고 수학 함수와 같이 입력과 출력의 관계를 정의하고 이러한 함수를 결합하여 프로그램이 무엇(What)과 같은지를 표현하는 선언형...","categories": ["Functional Programming"],
        "tags": ["Kotlin"],
        "url": "https://dream365.github.io/functional%20programming/fp-introduction/"
      },{
        "title": "FP: Option & Either Class",
        "excerpt":"함수형 프로그래밍에서 null과 관련된 처리를 하는 2가지 클래스인 Option과 Either 클래스에 대해서 다룹니다. Functional Progamming 시리즈 목차 Option class 값이 있는지 없는지 여부를 체크하기 위한 타입으로, null이나 error Checking을 안전하게 할 수 있습니다. 장점 null checking을 코드단에서 명시적으로 하여, 좀 더 안정적으로 체크할 수 있습니다. 값을 체이닝하여 가져올때 중간에 문제가...","categories": ["Functional Programming"],
        "tags": ["Java","Kotlin","Scala"],
        "url": "https://dream365.github.io/functional%20programming/fp-option-either/"
      },{
        "title": "FP: Memoization",
        "excerpt":"함수형 프로그래밍에서 계산에서의 자원 효율성을 위한 memoization에 대하여 다룹니다. Functional Progamming 시리즈 목차 순수함수는 주어진 input값에 대한 동작을 수행하여 항상 같은 output을 제공합니다. 이렇듯, 상태를 다루지 않는 특징으로 인해 사이드 이펙트가 없다는 장점이 있습니다. 이러한 일부 순수함수에서 복잡한 계산이 이루어지는 경우가 있습니다. 예를 들어, 서버 사이드에서 클라이언트에게 이런 값비싼 계산이...","categories": ["Functional Programming"],
        "tags": ["Kotlin","Scala"],
        "url": "https://dream365.github.io/functional%20programming/fp-memoization/"
      },{
        "title": "FP: Recursive Function",
        "excerpt":"함수형 프로그래밍에서 반복문 형식의 처리와 관련한 recursive function과 tail recurtion에 대하여 다룹니다. Functional Progamming 시리즈 목차 Recursive Function 재귀 함수는 함수를 구현할 때 자기 자신을 반복적으로 호출하여 반복문과 같이 표현하는 함수를 말합니다. 반복문의 경우 더 많은 변수와 이것들로 인해 발생하는 상태를 관리해야 함으로 함수형 프로그래밍 패러다임과는 다소 맞지 않으며, 변수가...","categories": ["Functional Programming"],
        "tags": ["Kotlin","Scala"],
        "url": "https://dream365.github.io/functional%20programming/fp-recursive-function/"
      },{
        "title": "FP: Lambda",
        "excerpt":"함수형 프로그래밍의 중요한 feature인 lambda에 대하여 다룹니다. Functional Progamming 시리즈 목차 lambda 이름없는 함수, 무명함수, 익명함수 등으로 변역되며 람다대수에 기초합니다. FP 에서는 함수를 1급 시민으로 취급하여 파라미터로 넘기거나 함수자체를 반환 할 수 있습니다.이때 파라미터로 넘길 함수를 따로 만들지 않고 그순간에만 사용하거나 간단한 식인경우 함수 본체만 넘기면 편합니다. 장점 코드가 간결해집니다....","categories": ["Functional Programming"],
        "tags": ["C++","C#","F#","Clojure"],
        "url": "https://dream365.github.io/functional%20programming/fp-lambda/"
      },{
        "title": "FP: Map & Reduce & Filter",
        "excerpt":"함수형 프로그래밍의 고차함수(Map &amp; Reduce &amp; Filter)에 대하여 다룹니다. Functional Progamming 시리즈 목차 Map Reduce Filter 함수를 파라미터로 받아서 실행하거나 함수를 리턴해주는 함수를 고차함수라고 합니다. Map Reduce Filter는 FP 에서 기초적이면서 가장 자주 사용하는 고차함수들입니다. Map 시퀀스의 각 요소를 다른 값으로 매핑 시키는 함수 Filter 시퀀스에서 특정 조건의 요소만 필터링...","categories": ["Functional Programming"],
        "tags": ["C++","C#","F#","Clojure"],
        "url": "https://dream365.github.io/functional%20programming/fp-map-reduce-filter/"
      },{
        "title": "FP: Currying",
        "excerpt":"함수형 프로그래밍의 커링(Currying)에 대하여 다룹니다. Functional Progamming 시리즈 목차 Currying 하나 이상의 파라미터를 받는 함수에서 몇몇 파라미터를 미리 지정하여 새로운 함수로써 사용하는것입니다.(본 설명에서는 Currying 과 Partial function 에 차이를 두지않습니다)Currying 이 언어적 차원에서 적용되는경우 fun(1,2,3) 은 fun(1)(2)(3) 처럼 처리됩니다. 장점 중간함수를 작성할 필요가 없어서 편합니다.함수의 지연실행이 가능합니다.함수합성에서 파라미터를 하나만 받는...","categories": ["Functional Programming"],
        "tags": ["C++","C#","F#","Clojure","Kotlin","Scala"],
        "url": "https://dream365.github.io/functional%20programming/fp-currying/"
      },{
        "title": "FP: Lazy Loading",
        "excerpt":"함수형 프로그래밍의 Lazy Loading에 대하여 다룹니다. Functional Progamming 시리즈 목차 Lazy 필요(요구)할떄 결과를 계산하는 방식입니다.필요할때 객체를 생성하면 Lazy Initialization필요할때 식을 평가하면 Lazy Evaluation 장점 처음에 모든것을 초기화하는데 장시간 소요되는것을 막습니다.무한한 리스트를 생성할 수 있습니다. 단점 필요할때 마다 계산을 요합니다. (단 자주쓰이는 경우 메모지에이션이 가능합니다.)지연과 즉시중에 좋은 경우를 골라 잘 사용해야합니다....","categories": ["Functional Programming"],
        "tags": ["C#","F#","Clojure"],
        "url": "https://dream365.github.io/functional%20programming/fp-lazy-loading/"
      },{
        "title": "FP: Pattern Matching & Destruction",
        "excerpt":"함수형 프로그래밍의 Pattern Matching과 Destruction에 대하여 다룹니다. Functional Progamming 시리즈 목차 Pattern Matching 대상이 특정한 패턴을 가지고 있는가를 확인합니다.기존의 if문 타입 체크나 switch-case 문의 발전형식입니다. Destruction 구조를 분해하는것. 예를 들어 튜플에서 (a,b) = (“key”,”value”) 면 a와 b에 각각 “key”, “value” 가 알아서 할당됩니다.패턴매칭과 같이 사용하여 매칭을 편하게 할 수 있습니다....","categories": ["Functional Programming"],
        "tags": ["C++","C#","F#","Clojure"],
        "url": "https://dream365.github.io/functional%20programming/fp-pattern-matching-destructuring/"
      },{
        "title": "MapStruct: Introduction",
        "excerpt":"Java Bean Mapping을 쉽게하기 위한 Java 프로젝트인 MapStruct에 대한 소개 포스팅입니다. Table of Contents MapStruct란 무엇인가? 왜 사용할까? 어떻게 사용할까? 간단한 예제 Model Mapper Interface Mapper를 이용한 동작 테스트 MapStruct란 무엇인가? configuration을 기반으로 Java Bean들을 서로 mapping 시켜주는 code generator 프로젝트 생성된 매핑 코드는 일반적인 메소드 호출을 사용하여 이해 하기...","categories": ["Library"],
        "tags": ["MapStruct","Java"],
        "url": "https://dream365.github.io/library/mapstruct-introduction/"
      },{
        "title": "MapStruct: Defining a mapper",
        "excerpt":"MapStruct의 bean mapper를 정의 하는 방법에 대해 설명하는 포스팅입니다. Table of Contents 기본적인 맵핑 방법 맵퍼에 커스텀 메서드 추가하기기본적인 맵핑 방법 간단하게 mapping 함수를 갖는 인터페이스와 Mapper 어노테이션을 이용하여 Mapper를 만들 수 있음 @Mapperpublic interface CarMapper { @Mapping(source = \"make\", target = \"manufacturer\") @Mapping(source = \"numberOfSeats\", target = \"seatCount\") CarDto...","categories": ["Library"],
        "tags": ["MapStruct","Java"],
        "url": "https://dream365.github.io/library/mapstruct-defining-a-mapper/"
      },{
        "title": "Clean Code: Chapter 01 Clean Code",
        "excerpt":"더 좋은 프로그램을 작성하기 위하여 깨끗한 코드를 작성하는 방법에 대해 다루는 Robert C. Martin의 Clean Code를 정리하는 post입니다. Table of Contents 코드가 존재하리라 나쁜 코드 나쁜 코드로 치르는 대가 원대한 재설계의 꿈 태도 원초적 난제 깨끗한 코드라는 예술? 우리는 저자다 보이스카우트 규칙 결론이 책을 읽는 이유 프로그래머라서 더 나은 프로그래머가...","categories": ["Book Review"],
        "tags": ["Clean Code"],
        "url": "https://dream365.github.io/book%20review/clean-code-chapter-01-clean-code/"
      },{
        "title": "Clean Code: Chapter 02 Meaningful Names",
        "excerpt":"더 좋은 프로그램을 작성하기 위하여 깨끗한 코드를 작성하는 방법에 대해 다루는 Robert C. Martin의 Clean Code를 정리하는 post입니다. Table of Contents 의도를 분명히 밝혀라 그릇된 정보를 피하라 의미 있게 구분하라 발음하기 쉬운 이름을 사용하라 검색하기 쉬운 이름을 사용하라 인코딩을 피하라 자신의 기억력을 자랑하지 마라 클래스 이름 메서드 이름 한 개념에...","categories": ["Book Review"],
        "tags": ["Clean Code"],
        "url": "https://dream365.github.io/book%20review/clean-code-chapter-02-meaningful-name/"
      }]
