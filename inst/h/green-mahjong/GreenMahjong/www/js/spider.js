var matchingGame = matchingGame ||{};


matchingGame.spider= {};

matchingGame.spider.positionX = [
              3.5, 4.5,           7,        9,         11.5, 12.5,
    1.5,           4.5, 5.5,      7.5, 8.5,                
         2.5, 3.5, 4.5,      6.5, 7.5, 8.5, 9.5,  10.5, 11.5,     
                        5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5, 13.5, 14.5,
    1,   2,   3,   4,   5,   6,   7,   8,   9,   10,   11,   12, 13,   14,   15,
                        5.5, 6.5, 7.5, 8.5, 9.5, 10.5,
    1.5, 2.5, 3.5, 4.5,      6.5, 7.5, 8.5, 9.5,       11.5, 12.5,
                                  7.5, 8.5, 13.5, 14.5,
    // 2. Schicht
              3.5, 4.5,           7,        9,         11.5, 12.5,
    1.5,           4.5, 5.5,                            
         2.5, 3.5, 4.5,           7.5, 8.5,      10.5, 11.5,   
                             6.5, 7.5, 8.5, 9.5,       11.5, 12.5, 13.5, 14.5,
    1,   2,   3,   4,        6,   7,   8,   9,   10,         12, 13,   14,   15,
                             6.5, 7.5, 8.5, 9.5,
    1.5, 2.5, 3.5, 4.5,           7.5, 8.5,            11.5, 12.5,
                                  7.5, 8.5, 13.5, 14.5,
    // 3. Schicht
                   4.5,                                11.5,
    1.5,                5.5,                                           
              3.5,                                           
                                 7.5, 8.5,          10.5,    12.5,     14.5,
    1,        3,                 7,   8,   9, 13,         15,
                                 7.5, 8.5,
    1.5,      3.5,               7.5, 8.5,                   12.5,
                                                                        14.5,
    // 4. Schicht
                                      8
];

matchingGame.spider.positionY = [
                  0, 0,           0,        0,         0, 0,
    1.5,           1, 1.5,      1, 1,                 
         2, 2.5, 2.5,      2, 2, 2, 2,  1.5, 1,      
                        3, 3, 3, 3, 3, 3,             2.5, 2.5, 2, 1.5,
    4.5, 4.5, 4.5, 4.5, 4,   4,   4,   4,   4,   4,   4,   4.5, 4.5,   4.5,   4.5,
                        5, 5, 5, 5, 5, 5,
    7, 7, 6.5, 6,          6, 6, 6, 6,       6, 6.5,
                              7, 7,                        7, 7,
    // 2. Schicht
                  0, 0,           0,        0,         0, 0,
    1.5,           1, 1.5,                      
         2, 2.5, 2.5,           2, 2,  1.5, 1,          
                             3, 3, 3, 3,                 2.5, 2.5, 2, 1.5,
    4.5,   4.5,   4.5,   4.5,        4,   4,   4,   4,   4, 4.5,   4.5,   4.5,   4.5,
                             5, 5, 5, 5,
    7, 7,  6.5, 6,           6, 6,            6, 6.5,
                         7, 7,                        7, 7,
    // 3. Schicht
                   0,                                0,
    1.5,                1.5,                                                   
              2.5,                                                      
                                 3, 3,      1.5,            2.5,             1.5,
    4.5,        4.5,                 4,   4, 4,                      4.5,         4.5,
                                 5, 5,
    7,        6.5,               6, 6,                   6.5,
                                                                                   7,
    // 4. Schicht
                                      4.5
];

matchingGame.spider.shift = [
              0, 0,           0,        0,         0, 0,
    0,           0, 0,      0, 0,                 
         0, 0, 0,      0, 0, 0, 0,   0, 0,    
                        0, 0, 0, 0, 0, 0,     0, 0,   0, 0,  
    0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 0,   0,
                        0, 0, 0, 0, 0, 0,
    0,   0,   0, 0,        0, 0, 0, 0,       0, 0,
                         0, 0,                        0, 0,
    // 2. Schicht
              1, 1,           1,        1,         1, 1,
    1,           1, 1,                                  
         1, 1, 1,           1, 1,   1, 1,          
                             1, 1, 1, 1,         1, 1,  1, 1,
    1,   1,   1,   1,        1,   1,   1,   1,   1,         1, 1,   1,   1,
                             1, 1, 1, 1,
    1, 1, 1, 1,                 1, 1,            1, 1,
                         1, 1,                        1, 1,
    // 3. Schicht
                   2,                                2,
    2,                2,                                        
              2,                             2,              
                                 2, 2,                       2, 2,
    2,        2,                 2,   2,   2, 2,         2,
                                 2, 2,
    2,        2,               2, 2,                   2,
                                                                           2,
    // 4. Schicht
                                      3
];

matchingGame.spider.selectable = [
              false, false,           false,        false, false, false,
    false,           false, false,      true, true,               
         false, false, false,      false, false, false, false,  
                        false, false, false, false, false, false,        false, false,  false, false,
    false,   false,   false,   false,   false,   false,  false, false,  false, false,   false,   false,   false,   false,   false,   false, false,
                        true, false, false, false, false, true,
    false, false,     false, false,              true, false, false, true, false, false,
                         false, false,                        false, false,
    // 2. Schicht
              true, false,           true,        true, false, true,
    false,           true, false,                                  
         false, false, true,           true, true,      false, true,       
                             true, false, false, true,                    true, false,  false, false,
    false,   false,   false,   true,        true,   false, false,   false,   true,         true,   false,   false,   false,
                             true, false, false, true,
    false, false,     false, true,           false, false,            true, false,
                         true, true,                        false, false,
    // 3. Schicht
                   true,                                true,
    true,                true,                                                                 
              true,                                           
                                 true, true,        true,     true,                            true,
    true,        true,                 true,   false, true,                      true,         true,
                                 false, false,
    true,        true,               true, true, true,
                                                                                                true,
    // 4. Schicht
                                      true
];