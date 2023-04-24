export class TabLink {
  label: string;
  link: string;
  index: number;

  public constructor(label: string,
    link: string,
    index: number,) {
    this.label = label;
    this.link = link;
    this.index = index;
  }
}
