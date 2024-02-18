type InitParams = {
  target: HTMLElement;  // 
  scale: number,  // 图片放大比例
  windowW: number, // 放大展示框的宽度
  windowH: number, // 放大展示框的高度
  originW: number, // 原始容器宽度
  originH: number, // 原始容器高度
  left: number     // 放大展示框距离原始容器左边距
}

export class Magnifier {
  scale: number;
  windowW: number;
  windowH: number;
  originW: number;
  originH: number;
  left: number;
  imgW: number;
  imgH: number;
  container: HTMLElement | null;
  imgElm: HTMLElement | null;
  target: HTMLElement;
  constructor(private params: InitParams) {
    this.target = params.target;
    this.scale = params.scale;
    this.windowW = params.windowW;
    this.windowH = params.windowH;
    this.originW = params.originW;
    this.originH = params.originH;
    this.left = params.left;
    this.imgW = params.originW * params.scale;
    this.imgH = params.originH * params.scale;
    this.container = null;
    this.imgElm = null;
    if (window.getComputedStyle(this.target).position === 'static') {
      this.target.style.position = 'relative';
    }
    this.target.style.cursor = 'zoom-in';
  }

  bindEvents () {
    this.target.querySelector('img')?.addEventListener?.('mousemove', this.move)

    this.target.querySelector('img')?.addEventListener?.('mouseout', this.hide)
  }
  
  /**
   * @description 创建放大器容器
   * @returns 
   */
  createContainer () {
    const container = document.createElement('div');
    container.style.width = this.windowW + 'px';
    container.style.height = '100%';
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.right = '-' + (this.windowW + this.left) + 'px';
    container.style.overflow = 'hidden';
    return container
  }

  /**
   * @description 创建放大镜容器中的图片
   * @param url 图片地址
   * @returns 
   */
  createImg (url: string) {
    const imgElm = document.createElement('img');
    imgElm.style.objectFit = 'cover';
    imgElm.style.width = this.imgW + 'px';
    imgElm.style.height = this.imgH + 'px';
    imgElm.style.position = 'relative';
    imgElm.src = url;
    return imgElm
  }

  render (url: string) {
    this.container = this.createContainer();
    this.imgElm = this.createImg(url);
    this.container.append(this.imgElm)
  }

  /**
   * @description 鼠标移动时
   * @param e 鼠标事件
   */
  move (e: MouseEvent) {
    if (this.imgElm) {
      const x = -e.offsetX * ((this.imgW - this.windowW) / this.originW);
      const y = -e.offsetY * ((this.imgH - this.windowH) / this.originH);
      this.imgElm.style.left = x + 'px'
      this.imgElm.style.top = y + 'px'
    }
  }

  show (url: string) {
    this.render(url);
    if (this.target && this.container) {
      this.target.append(this.container)
    }
  }

  hide () {
    if (this.target && this.container) {
      this.target?.removeChild(this.container)
    }
  }
}