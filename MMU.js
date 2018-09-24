MMU = {
    rb: function(addr) { /* Read 8-bit byte from a given addr */ },
    rw: function(addr) { /* Read 16-bit word from a given addr */ },

    wb: function(addr, val) { /* Write 8-bit byte to a given addr */ },
    ww: function(addr, val) { /* Write 16-bit word to addr */ }
};