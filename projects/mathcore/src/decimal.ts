export interface Decimal {
  add(another: Decimal | number | string): Decimal;
  sub(another: Decimal | number | string): Decimal;
  mul(another: Decimal | number | string): Decimal;
  div(another: Decimal | number | string): Decimal;
  neg(): Decimal;
}
