// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators

Z80 = {
    // Time clock: holds two types of clock (m and t)
    _clock: {m:0, t:0},

    // Register set
    _r: {
        a:0, b:0, c:0, d:0, e:0, h:0, l:0, f:0, // 8-bit registers
        pc:0, sp:0, // 16-bit registers
        m:0, t:0 // Clock for last instr
    },

    // Flags
    // 0x80 - Zero, if last op produced 0
    // 0x40 - Subtraction, if last op was a subtraction
    // 0x20 - Half carry, if lower half of the byte overflowed past 15
    // 0x10 - Carry, set if last operation produced result over 255 (for add) or under 0 (for sub)

    // Add E to A, leaving result in A (ADD A, E)
    // TODO: doesnt implement half-carry flag
    ADDr_e: function() {
        Z80._r.a += Z80._r.e; // Perform addition
        Z80._r.f = 0; // Clear flags
        if (!(Z80._r.a & 255)) Z80._r.f |= 0x80 // Check for zero
        if (Z80._r.a > 255) Z80._r.f |= 0x10; // Check for carry (overflow)
        Z80._r.a &= 255; // Mask to 8 bits
        Z80._r.m = 1; Z80._r.t = 4; // 1 M-time taken
    },

    // Compare B to A, setting flags (CP A, B)
    CPr_b: function() {
        var i = Z80._r.a;
        i -= Z80._r.b;
        Z80._r.f |= 0x40; // Set subtraction flag
        if(!(i & 255)) Z80._r.f |= 0x80; // Check for zero
        if(i<0) Z80._r.f |= 0x10; // set underflow
        Z80._r.m = 1; Z80._r.t = 4; // 1 M-time taken
    },

    NOP: function() {
        Z80._r.m = 1; Z80._r.t = 4;
    }
}