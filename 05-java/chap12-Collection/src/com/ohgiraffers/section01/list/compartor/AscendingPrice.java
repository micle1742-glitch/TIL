package com.ohgiraffers.section01.list.compartor;

import com.ohgiraffers.section01.list.dto.BookDTO;

import java.util.Comparator;

public class AscendingPrice implements Comparator<BookDTO> {
    @Override
    public int compare(BookDTO o1, BookDTO o2) {
        return Integer.compare(o1.getPrice(), o2.getPrice());
    }
}
