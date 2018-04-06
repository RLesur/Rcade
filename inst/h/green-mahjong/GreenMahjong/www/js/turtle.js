matchingGame = matchingGame ||{};

matchingGame.turtle= {};
matchingGame.turtle.positionX = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    4, 5, 6, 7, 8, 9, 10, 11,
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    4, 5, 6, 7, 8, 9, 10, 11,
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    // 2. Schicht
    5, 6, 7, 8, 9, 10,
    5, 6, 7, 8, 9, 10,
    5, 6, 7, 8, 9, 10,
    5, 6, 7, 8, 9, 10,
    5, 6, 7, 8, 9, 10,
    5, 6, 7, 8, 9, 10,
    // 3. Schicht
    6, 7, 8, 9,
    6, 7, 8, 9,
    6, 7, 8, 9,
    6, 7, 8, 9,
    // 4. Schicht
    7, 8,
    7, 8,
    // 5. Schicht
    7.5
];

matchingGame.turtle.positionY = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    3.5, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3.5, 3.5,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    6, 6, 6, 6, 6, 6, 6, 6,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    // 2. Schicht
    1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2,
    3, 3, 3, 3, 3, 3,
    4, 4, 4, 4, 4, 4,
    5, 5, 5, 5, 5, 5,
    6, 6, 6, 6, 6, 6,
    // 3. Schicht
    2, 2, 2, 2,
    3, 3, 3, 3,
    4, 4, 4, 4,
    5, 5, 5, 5,
    // 4. Schicht
    3, 3,
    4, 4,
    // 5. Schicht
    3.5
];

matchingGame.turtle.shift = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    // 3. Schicht
    2, 2, 2, 2,
    2, 2, 2, 2,
    2, 2, 2, 2,
    2, 2, 2, 2,
    // 4. Schicht
    3, 3,
    3, 3,
    // 5. Schicht
    4
];

matchingGame.turtle.selectable = [
    true, false, false, false, false, false, false, false, false, false, false, true,
    true, false, false, false, false, false, false, true,
    true, false, false, false, false, false, false, false, false, true,
    true, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, true,
    true, false, false, false, false, false, false, false, false, true,
    true, false, false, false, false, false, false, true,
    true, false, false, false, false, false, false, false, false, false, false, true,
    true, false, false, false, false, true,
    true, false, false, false, false, true,
    true, false, false, false, false, true,
    true, false, false, false, false, true,
    true, false, false, false, false, true,
    true, false, false, false, false, true,
    // 3. Schicht
    true, false, false, true,
    true, false, false, true,
    true, false, false, true,
    true, false, false, true,
    // 4. Schicht
    false, false,
    false, false,
    // 5. Schicht
    true
];