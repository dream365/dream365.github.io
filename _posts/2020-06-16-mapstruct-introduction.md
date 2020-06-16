---
title: "MapStruct: Introduction"
categories:
  - MapStruct
tags:
  - Java
  - MapStruct
author:
  name: Sewon Ko
  picture: /images/sw-profile.png
last_modified_at: 2020-06-16T20:38:52-05:00
---

> Java Bean Mapping을 쉽게하기 위한 Java 프로젝트인 MapStruct에 대한 포스팅입니다.

![logo](/images/map-struct-logo.png)

## MapStruct란 무엇인가?    

- configuration을 기반으로 Java Bean들을 서로 mapping 시켜주는 **code generator** 프로젝트 
 
- 생성된 매핑 코드는 일반적인 메소드 호출을 사용하여 이해 하기 **쉽고, 빠르고, 타입 안정성**을 지켜줌

## 왜 사용할까?    
Multi-layered 어플리케이션에서 다른 계층 혹은 다른 쓰임새를 갖는 object 모델들(예를 들어, 테이블 엔티티와 DTO)사이의 맵핑이 자주 요구된다. 이런 매핑 코드를 일일히 작성하는 것은 **매우 지루하고 오류가 발생**하기 쉬운 작업이므로, 이런 MapStruct와 같은 기술을 사용하여 최대한 **자동화하고 단순화**하려고 사용  

다른 Mapping Framework들과 달리 MapStruct는 컴파일 타입에 빈 맵핑을 하고 코드를 생성하여 **high performance**를 보장하고 개발자의 **빠른 피드백과 오류 확인**을 가능하게 해줌  

## 어떻게 사용할까?
**MapStruct**는 **annotation processor**로 작동되어서, gradle이나 메이븐 같은 매니징 툴의 플러그인으로 손쉽게 사용할 수 있음

## 간단한 예제

다음 예제는 어떻게 2개의 오브젝트를 서로 맵핑하는지 보여준다.

**주문(Order)**를 표현하는 **JPA 엔티티**와 **DTO**가 있다고 가정해보자, 2가지 모델은 매우 비슷하지만 오직 **상품 갯수를 카운팅하는 attribute의 이름**과 **서비스 타입을 나타내는 attribute의 자료형**이 다르다.

#### Model


```java
public class Order {

    private String code;
    private int numberOfProducts;
    private ServiceType type;

    //constructor, getters, setters etc.
}

public class OrderDto {

    private String code;
    private int productCount;
    private String type;

    //constructor, getters, setters etc.
}
```

#### Mapper Interface

**Order**로부터 **OrderDto**를 맵핑하기 위하여 **mapper interface**가 필요

```java
@Mapper // (1)
public interface OrderMapper {

    OrderMapper INSTANCE = Mappers.getMapper( OrderMapper.class ); // (3)

    @Mapping(source = "numberOfProducts", target = "productCount)
    OrderDto orderToOrderDto(Order order); // (2)
}
```

1. @Mapper 어노테이션은 MapStruct 프로세서에게 컴파일 타임에 해당 인터페이스가 Mapper Interface임을 알 수 있게 해준다.    

2. 
    - source 오브젝트를 파라미터로 하여 target object를 리턴함(function naming은 자유로움)
    - source 및 target object의 attribute의 이름이 다른 경우 @Mapping 어노테이션을 사용
    - 가능한 경우 source object에서 다른 유형으로의 자료형 변환이 이루어진다(해당 예제에서 type attribute는 enum에서 문자열로 변환)
    - 당연히 하나의 인터페이스에 여러가지 매핑 방법이 있을 수 있으며 모두 MapStruct 프로세서에 의해 코드가 생성됨

3. 일반적으로 인터페이스는 멤버 INSTANCE를 선언하여 클라이언트가 Mapper의 구현체에 접근 할 수 있도록 해줌

#### Mapper를 이용한 동작 테스트

```java
@Test
public void shouldMapOrderToDto() {
    //given
    Order order = new Order( "order_001", 3, ServiceType.FOOD );
 
    //when
    OrderDto orderDto = OrderMapper.INSTANCE. orderToOrderDto( order );
 
    //then
    assertThat( orderDto ).isNotNull();
    assertThat( orderDto.getCode() ).isEqualTo( "order_001" );
    assertThat( orderDto.getProductCount() ).isEqualTo( 3 );
    assertThat( orderDto.getType() ).isEqualTo( "FOOD" );
}
```
