const Validator = require('../Validator');
const expect = require('chai').expect;

describe('testing-configuration-logging/unit-tests', () => {
  describe('Validator', () => {
    it('валидатор проверяет строковые поля', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
      });

      const errorsType = validator.validate({ name: false })
      const errorsMinName = validator.validate({name: "qwerty"});
      const errorsMaxName = validator.validate({name: "qwerty_qwerty_qwerty_qwerty"});
      const notErrors1 = validator.validate({name: "qwerty_qwe"});
      const notErrors2 = validator.validate({name: "qwerty_qwerty_qwerty"});

      expect(errorsType).to.have.length(1);
      expect(errorsType[0]).to.have.property('field').and.to.be.equal('name');
      expect(errorsType[0]).to.have.property('error').and.to.be.equal('expect string, got boolean');

      expect(errorsMinName).to.have.length(1);
      expect(errorsMinName[0]).to.have.property('field').and.to.be.equal('name');
      expect(errorsMinName[0]).to.have.property('error').and.to.be.equal('too short, expect 10, got 6');

      expect(errorsMaxName).to.have.length(1);
      expect(errorsMaxName[0]).to.have.property('field').and.to.be.equal('name');
      expect(errorsMaxName[0]).to.have.property('error').and.to.be.equal('too long, expect 20, got 27');

      expect(notErrors1).to.have.length(0);
      expect(notErrors2).to.have.length(0);
    });
    it('валидатор проверяет числовые поля', () => {
      const validator = new Validator({
        age: {
          type: 'number',
          min: 18,
          max: 27,
        },
      });

      const errorsType = validator.validate({age: true});
      const errorsMinAge = validator.validate({age: 10});
      const errorsMaxAge = validator.validate(({age: 30}));
      const notErrors1 = validator.validate(({age: 18}));
      const notErrors2 = validator.validate(({age: 27}));

      expect(errorsType).to.have.length(1);
      expect(errorsType[0]).to.have.property('field').and.to.be.equal('age');
      expect(errorsType[0]).to.have.property('error').and.to.be.equal('expect number, got boolean');

      expect(errorsMinAge).to.have.length(1);
      expect(errorsMinAge[0]).to.have.property('field').and.to.be.equal('age');
      expect(errorsMinAge[0]).to.have.property('error').and.to.be.equal('too little, expect 18, got 10');

      expect(errorsMaxAge).to.have.length(1)
      expect(errorsMaxAge[0]).to.have.property('field').and.to.be.equal('age');
      expect(errorsMaxAge[0]).to.have.property('error').and.to.be.equal('too big, expect 27, got 30')

      expect(notErrors1).to.have.length(0);
      expect(notErrors2).to.have.length(0);
    });
  });
});
