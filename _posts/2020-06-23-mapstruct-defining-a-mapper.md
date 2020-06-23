---
title: "MapStruct: Defining a mapper"
categories:
  - MapStruct
tags:
  - Java
  - MapStruct
author:
  name: Sewon Ko
  picture: /images/sw-profile.png
last_modified_at: 2020-06-23T16:10:00-00:00
---

MapStruct의 bean mapper를 정의 하는 방법에 대해 설명하는 포스팅입니다.

![logo](/images/map-struct-logo.png)

{% include toc %}

## 기본적인 맵핑 방법

간단하게 **mapping 함수를 갖는 인터페이스**와 **Mapper** 어노테이션을 이용하여 **Mapper**를 만들 수 있음

```java
@Mapper
public interface CarMapper {

    @Mapping(source = "make", target = "manufacturer")
    @Mapping(source = "numberOfSeats", target = "seatCount")
    CarDto carToCarDto(Car car);

    @Mapping(source = "name", target = "fullName")
    PersonDto personToPersonDto(Person person);
}
```

- **@Mapper** 어노테이션을 이용하여 MapStruct 코드 제너레이터가 build-time에 **CarMapper 인터페이스**의 구현체를 만듦

- 생성된 코드는 모든 **source type(Car 객체)**의 readable properties를 **target type(Cardio 객체)**에 일치하는 property에 복사
    - source와 target에서 **같은 이름**을 갖는 property들은 암시적으로 맵핑
    - source와 target에서 **다른 이름**을 갖는 property들은 **@Mapping** 어노테이션을 이용해 해당 properties의 이름들을 명시해주어야 함

좀 더 빠른 이해를 위해 실제 MapStruct의 코드 제너레이터를 통해 만들어진 **CarMapper**의 구현체를 보자

```java
// GENERATED CODE
public class CarMapperImpl implements CarMapper {
  
    @Override
    public CarDto carToCarDto(Car car) {
        if ( car == null ) {
            return null;
        }

        CarDto carDto = new CarDto();

        if ( car.getFeatures() != null ) {
            carDto.setFeatures( new ArrayList<String>( car.getFeatures() ) );
        }
        carDto.setManufacturer( car.getMake() );
        carDto.setSeatCount( car.getNumberOfSeats() );
        carDto.setDriver( personToPersonDto( car.getDriver() ) );
        carDto.setPrice( String.valueOf( car.getPrice() ) );
        if ( car.getCategory() != null ) {
            carDto.setCategory( car.getCategory().toString() );
        }
        carDto.setEngine( engineToEngineDto( car.getEngine() ) );

        return carDto;
    }

    @Override
    public PersonDto personToPersonDto(Person person) {
        //...
    }

    private EngineDto engineToEngineDto(Engine engine) {
        if ( engine == null ) {
            return null;
        }

        EngineDto engineDto = new EngineDto();

        engineDto.setHorsePower(engine.getHorsePower());
        engineDto.setFuel(engine.getFuel());

        return engineDto;
    }
}
```

- **MapStruct**의 철학은 최대한 개발자가 직접 손으로 작성한것과 같은 코드를 생성한다. (Reflection 사용 대신 평범한 getter/setter 함수의 호출을 이용해 mapping)

- 만일 source와 target property의 **type**이 다르다면 자동으로 conversion 해줌(위 예제의 price property) 또는, 다른 **mapping method**를 생성 후 호출(위 예제의 driver, engine property)

- **Collection Type property**의 경우 element type이 같다면 새로운 collection 객체를 생성하여 값을 복사해주고, 다르다면 각각의 element들을 conversion한 뒤 새로운 collection 객체에 값 복사해준다.
