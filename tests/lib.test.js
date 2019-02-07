const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute (number)', () => {
  it('should return a positive number if input +', ()=> {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it('should return a positive number if input -', ()=> {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it('should return zero if input is zero', ()=> {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe('greet (string)', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('Mosh');
    expect(result).toMatch(/Mosh/);
    // expect(result).toContain('Mosh');
    // testing strings make sure not too specific...
  });
});

describe('getCurrencies (array)', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies();
    // too general
    // expect(result).toBeDefined();
    // expect(result).not.toBeNull();

    // too specific
    // expect(result[0]).toBe('USD');
    // expect(result[1]).toBe('AUD');
    // expect(result[2]).toBe('EUR');
    // expect(result.length).toBe(3);

    // proper way..
    // expect(result).toContain('USD');
    // expect(result).toContain('AUD');
    // expect(result).toContain('EUR');

    // ideal way
    expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD'])); // can be any order


  });
});

describe('getProduct (object)', () => {
  it('should return the product with the given id', () => {
    const result = lib.getProduct(1);
    expect(result).toEqual({id:1, price:10}); //don't use toBe to check equality
    expect(result).toMatchObject({id:1, price:10}); //includes these properties in object
    expect(result).toHaveProperty('id', 1); //includes these specific property
  });
});

describe('registerUser (exceptions)', () => {
  it('should throw is username is falsy', () => {
    const args = [ null, undefined, NaN, "", 0, false ];

    args.forEach( a => {
      expect(() => { lib.registerUser(a)}).toThrow();
    })
  });

  it('should return user object if valid username passed', () => {
    const result = lib.registerUser('mosh');
    expect(result).toMatchObject({username: 'mosh'});
    expect(result.id).toBeGreaterThan(0);
  });
});

describe('applyDiscount (mock function)', () => {
  it('should apply 10% discount if customer has more than 10 points', () => {

    db.getCustomerSync = (customerId) => {
      console.log('mock reading customer (getCustomerSync)');
      return {id:customerId, points:20};
    };

    const order = {customerId1: 1, totalPrice: 10};

    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe('notify customer (mock function interaction)', () => {
  it('should send an amil to the customer', () => {

    db.getCustomerSync = (order) => {
      return {email: 'a'};
    }

    let mailSent = false;
    mail.send = (email, message) => {
      mailSent = true;
    }

    lib.notifyCustomer({customerId: 1});
    expect(mailSent).toBe(true);
  });
});


// jest mockFunctions

// returns values....
// const mockFunction = jest.fn();
// mockFunction.mockReturnValue(1);
// mockFunction() // returns 1
//
// returns promises...
// mockFunction.mockResolvedValue(1);
// mockFunction.mockRejectedValue(new Error('......'));
// const result = await mockFunction();


describe('notify customer (jest mock function)', () => {
  it('should send an amil to the customer', () => {

    db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'})
    mail.send = jest.fn()

    lib.notifyCustomer({customerId: 1});
    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe('a');
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);

    // expect(mail.send).toHaveBeenCalledWith('a', '....');
  });
});
