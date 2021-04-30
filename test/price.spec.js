const assert = require('assert')
const {expect} = require('chai')
const {getSuggestedPrice} = require('../js/price');
const {getTotal} = require('../js/price');
describe('price.js and tools.js',() =>{
it('getSuggestedPrice', () =>{
      const result = getSuggestedPrice('TX',[1],1200);
      expect(result).to.be.eq('1.695')
      const result2 = getSuggestedPrice('TX',[1],100);
      expect(result2).to.be.eq('1.710')
      const result3 = getSuggestedPrice('TX',[],1200);
      expect(result3).to.be.eq('1.710')
      const result4 = getSuggestedPrice('TX',[],100);
      expect(result4).to.be.eq('1.725')
      const result5 = getSuggestedPrice('LA',[1],100);
      expect(result5).to.be.eq('1.740')
      const result6 = getSuggestedPrice('LA',[1],1200);
      expect(result6).to.be.eq('1.725')
      const result7 = getSuggestedPrice('LA',[],100);
      expect(result7).to.be.eq('1.755')
      const result8 = getSuggestedPrice('LA',[],1200);
      expect(result8).to.be.eq('1.740')
      const result9 = getSuggestedPrice('TX',[1],1200);
      expect(result9).to.be.eq('1.695')
      const result10 = getSuggestedPrice('TX',[1],-1200);
      expect(result10).to.be.eq('1.695')
      const result11 = getSuggestedPrice('TX',[1],-1200);
      expect(result11).to.be.eq('1.695')
//get total
      const total1 = getTotal(1200,result);
      expect(total1).to.be.eq('2034.000')
      const total2 = getTotal(100,result2);
      expect(total2).to.be.eq('171.000')
      const total3 = getTotal(1200,result3);
      expect(total3).to.be.eq('2052.000')
      const total4 = getTotal(100,result4);
      expect(total4).to.be.eq('172.500')
      const total5 = getTotal(100,result5);
      expect(total5).to.be.eq('174.000')
      const total6 = getTotal(1200,result6);
      expect(total6).to.be.eq('2070.000')
      const total7 = getTotal(100,result7);
      expect(total7).to.be.eq('175.500')
      const total8 = getTotal(1200,result8);
      expect(total8).to.be.eq('2088.000')
      const total9 = getTotal(1200,result9);
      expect(total9).to.be.eq('2034.000')
      const total10 = getTotal(-1200,result10);
      expect(total10).to.be.eq('2034.000')
      const total11 = getTotal(-1200,result11);
      expect(total11).to.be.eq('2034.000')
 })
});