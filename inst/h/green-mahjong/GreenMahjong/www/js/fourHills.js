var matchingGame = matchingGame ||{};

matchingGame.fourHills = {};

matchingGame.fourHills.positionX = [
       2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
          3, 4, 5, 6,    8, 9, 10, 11,
          3, 4, 5, 6, 7, 8, 9, 10, 11,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
       2.5, 3.5, 4.5,       9.5, 10.5, 11.5,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
          3, 4, 5, 6, 7, 8, 9, 10, 11,
          3, 4, 5, 6,    8, 9, 10, 11,
       2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    // 2. Schicht
        3.5, 4.5, 5.5,       8.5, 9.5, 10.5,
        3.5, 4.5, 5.5,       8.5, 9.5, 10.5,
        3.5, 4.5, 5.5,       8.5, 9.5, 10.5,
        
        3.5, 4.5, 5.5,       8.5, 9.5, 10.5,
        3.5, 4.5, 5.5,       8.5, 9.5, 10.5,
        3.5, 4.5, 5.5,       8.5, 9.5, 10.5,
    // 3. Schicht
            4, 5,               9, 10,
            4, 5,               9, 10,
            
            4, 5,               9, 10,
            4, 5,               9, 10,
    // 4. Schicht
             4.5,                9.5,
             
             4.5,                9.5
];

matchingGame.fourHills.positionY = [
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          1, 1, 1, 1,    1, 1, 1, 1,
          2, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
       4, 4, 4,       4, 4, 4,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          6, 6, 6, 6, 6, 6, 6, 6, 6,
          7, 7, 7, 7,    7, 7, 7, 7,
       8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    // 2. Schicht
        0.5, 0.5, 0.5,       0.5, 0.5, 0.5,
        1.5, 1.5, 1.5,       1.5, 1.5, 1.5,
        2.5, 2.5, 2.5,       2.5, 2.5, 2.5,
        
        5.5, 5.5, 5.5,       5.5, 5.5, 5.5,
        6.5, 6.5, 6.5,       6.5, 6.5, 6.5,
        7.5, 7.5, 7.5,       7.5, 7.5, 7.5,
    // 3. Schicht
            1, 1,               1, 1,
            2, 2,               2, 2,
            
            6, 6,               6, 6,
            7, 7,               7, 7,
    // 4. Schicht
             1.5,                1.5,
             
             6.5,                6.5
];

matchingGame.fourHills.shift = [
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0,    0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0,       0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0,    0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    // 2. Schicht
        1, 1, 1,       1, 1, 1,
        1, 1, 1,       1, 1, 1,
        1, 1, 1,       1, 1, 1,
        
        1, 1, 1,       1, 1, 1,
        1, 1, 1,       1, 1, 1,
        1, 1, 1,       1, 1, 1,
    // 3. Schicht
            2, 2,               2, 2,
            2, 2,               2, 2,
            
            2, 2,               2, 2,
            2, 2,               2, 2,
    // 4. Schicht
             3,                3,
             
             3,                3
];

matchingGame.fourHills.selectable = [
           true, false, false, false, false, false, false, false, false, false, true,
                 false, false, false, false,        false, false, false, false,
                 false, false, false, false, false, false, false, false, false,
    true, false, false, false, false, false, false, false, false, false, false, false, true,
            true, false, true,                                  true, false, true,
    true, false, false, false, false, false, false, false, false, false, false, false, true,
                 false, false, false, false, false, false, false, false, false,
                 false, false, false, false,        false, false, false, false,
          true, false, false, false, false, false, false, false, false, false, true,
    // 2. Schicht
        false, false, false,       false, false, false,
        false, false, false,       false, false, false,
        false, false, false,       false, false, false,
        
        false, false, false,       false, false, false,
        false, false, false,       false, false, false,
        false, false, false,       false, false, false,
    // 3. Schicht
            false, false,               false, false,
            false, false,               false, false,
            
            false, false,               false, false,
            false, false,               false, false,
    // 4. Schicht
             true,                true,
             
             true,                true
];