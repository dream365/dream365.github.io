---
title: "Clean Code: Chapter 04 Comments"
categories:
  - Book Review
tags:
  - Clean Code
author:
  name: Sewon Ko
  picture: /images/sw-profile.png
last_modified_at: 2020-11-22T13:50:00-00:00
---

> 더 좋은 프로그램을 작성하기 위하여 깨끗한 코드를 작성하는 방법에 대해 다루는 ***Robert C. Martin***의 ***Clean Code***를 정리하는 post입니다.

![logo](/images/clean-code-cover.png)

{% include toc %}

우리는 **코드**로 **의도**를 표현하지 못해, **주석**을 사용한다.

프로그래머들이 **주석**을 지속적으로 **유지**하고 **보수**하기란 현실적으로 불가능하기 때문에, **주석**은 오래될수록 **코드**에서 멀어진다. 

따라서, 우리는 **주석**을 가능한 줄이도록 꾸준히 노력하고 **코드**로써 **표현력**을 **강화**하는 방향에 에너지를 쏟아야한다.

## 주석은 나쁜 코드를 보완하지 못한다.

코드에 **주석을 추가하는 이유**는 **코드 품질이** 나쁘기 때문이다. (표현력이 풍부하고 깔끔한 주석 없는 코드가 훨씬 좋다.)

## 코드로 의도를 표현하라 

```java
// 직원에게 복지 혜택을 받을 자격이 있는지 검사한다.
if ((employee.flags & HOURLY_FLAG) && (employee.age > 65))
```

주석보다는

```if (employee.isEligibleForFullBenefits())```

코드로 표현하자
