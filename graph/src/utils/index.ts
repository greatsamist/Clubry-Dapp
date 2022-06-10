import { ONE_BI, ZERO_BI, ZERO_BD, ONE_BD } from '../utils/constants';
import { BigInt, BigDecimal, ethereum } from '@graphprotocol/graph-ts'

export function safeDiv(amount0: BigDecimal, amount1: BigDecimal): BigDecimal {
    if (amount1.equals(ZERO_BD)) {
      return ZERO_BD
    } else {
      return amount0.div(amount1)
    }
}



