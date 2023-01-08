import { CreateElement } from '../Elements/CreateElement';
import { CreateRange } from '../Elements/CreateRange';
import { ConstructorRangeBlock } from '../Interfaces';

export class CreateRangeBlock extends CreateElement {
  private title: HTMLElement;
  private nums: HTMLElement;
  private from: HTMLElement;
  private to: HTMLElement;
  private rangeBlock: HTMLElement;
  private rangeLine: HTMLElement;
  private range1: HTMLInputElement;
  private range2: HTMLInputElement;

  constructor({
    title,
    from,
    to,
    range1Min,
    range1Max,
    range1Value,
    range2Min,
    range2Max,
    range2Value,
    isPrice,
    id,
    router,
    current,
  }: ConstructorRangeBlock) {
    super({ tag: 'div', className: 'aside__range range-menu' });
    this.title = new CreateElement({ tag: 'h2', className: 'range-menu__title', content: title }).getnode();
    this.nums = new CreateElement({ tag: 'div', className: 'range-menu__numbers' }).getnode();
    this.from = new CreateElement({ tag: 'span', className: 'range-menu__from', content: from }).getnode();
    this.to = new CreateElement({ tag: 'span', className: 'range-menu__to', content: to }).getnode();
    this.nums.append(this.from, this.to);
    this.rangeBlock = new CreateElement({ tag: 'div', className: 'range-menu__range' }).getnode();
    this.rangeLine = new CreateElement({ tag: 'div', className: 'range-menu__tracker' }).getnode();
    if (range1Value === '16') {
      range1Value = current!.min!;
    }
    if (range2Value === '1559') {
      range2Value = current!.max!;
    }
    if (range1Value === '2013') {
      range1Value = current!.min!;
    }
    if (range2Value === '2022') {
      range2Value = current!.max!;
    }
    this.range1 = new CreateRange({
      type: 'range',
      min: range1Min,
      max: range1Max,
      value: range1Value,
      id: `${id}-1`,
      className: 'range-menu__slider',
    }).getnode();
    //console.log('CRB');
    this.range2 = new CreateRange({
      type: 'range',
      min: range2Min,
      max: range2Max,
      value: range2Value,
      id: `${id}-2`,
      className: 'range-menu__slider',
    }).getnode();
    this.rangeBlock.append(this.rangeLine, this.range1, this.range2);
    this.el.append(this.title, this.nums, this.rangeBlock);
    if (isPrice) {
      this.from.textContent = '$ ' + this.range1.value;
      this.to.textContent = '$ ' + this.range2.value;
    } else {
      this.from.textContent = this.range1.value;
      this.to.textContent = this.range2.value;
    }
    ////////////////////// функционал //////////////////////

    const dis = +this.range1.max - +this.range1.min;
    const step = 100 / (+this.range1.max - +this.range1.min);
    const percent1 = (dis - (+this.range1.max - +this.range1.value)) * step;
    const percent2 = (dis - (+this.range1.max - +this.range2.value)) * step;
    this.rangeLine.style.background = `linear-gradient(to right, rgba(105, 0, 31, 0.08) ${percent1}% , #69001F ${percent1}% , #69001F ${percent2}%, rgba(105, 0, 31, 0.08) ${percent2}%)`;

    //console.log(this.range1.value);
    this.range1.addEventListener('input', () => {
      //console.log(this.range1.value);
      if (parseInt(this.range2.value) - parseInt(this.range1.value) <= 0) {
        this.range1.value = String(parseInt(this.range2.value) - 0);
      }
      if (isPrice) {
        this.from.textContent = '$ ' + this.range1.value;
      } else {
        this.from.textContent = this.range1.value;
      }
      const dis = +this.range1.max - +this.range1.min;
      const step = 100 / (+this.range1.max - +this.range1.min);
      const percent1 = (dis - (+this.range1.max - +this.range1.value)) * step;
      const percent2 = (dis - (+this.range1.max - +this.range2.value)) * step;
      this.rangeLine.style.background = `linear-gradient(to right, rgba(105, 0, 31, 0.08) ${percent1}% , #69001F ${percent1}% , #69001F ${percent2}%, rgba(105, 0, 31, 0.08) ${percent2}%)`;
    });
    this.range1.addEventListener('mouseup', () => {
      if (id === 'price-slider') {
        router!.AddRoutingToPriceMin(this.range1.value);
        router!.AddRoutingToPriceMax(this.range2.value);
      } else {
        router!.AddRoutingToYearMin(this.range1.value);
        router!.AddRoutingToYearMax(this.range2.value);
      }
    });
    this.range2.addEventListener('input', () => {
      if (parseInt(this.range2.value) - parseInt(this.range1.value) <= 0) {
        this.range2.value = String(parseInt(this.range1.value) + 0);
      }
      if (isPrice) {
        this.to.textContent = '$ ' + this.range2.value;
      } else {
        this.to.textContent = this.range2.value;
      }
      const dis = +this.range1.max - +this.range1.min;
      const step = 100 / (+this.range1.max - +this.range1.min);
      const percent1 = (dis - (+this.range1.max - +this.range1.value)) * step;
      const percent2 = (dis - (+this.range1.max - +this.range2.value)) * step;
      this.rangeLine.style.background = `linear-gradient(to right, rgba(105, 0, 31, 0.08) ${percent1}% , #69001F ${percent1}% , #69001F ${percent2}%, rgba(105, 0, 31, 0.08) ${percent2}%)`;
    });
    this.range2.addEventListener('mouseup', () => {
      if (id === 'price-slider') {
        router!.AddRoutingToPriceMin(this.range1.value);
        router!.AddRoutingToPriceMax(this.range2.value);
      } else {
        router!.AddRoutingToYearMin(this.range1.value);
        router!.AddRoutingToYearMax(this.range2.value);
      }
    });
  }
}
