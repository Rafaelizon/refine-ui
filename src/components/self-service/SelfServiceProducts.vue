<script setup lang="ts">
import { useCartStore } from '@/stores/cart.store';
import { useMandatoryProductsStore } from '@/stores/mandatory-products.store';
import { toCurrency } from '@/utils/currency';
import { formatWeight } from '@/utils/decimal';
import Button from '../Button.vue';
import Card from '../card/Card.vue';
import Icon from '../Icon.vue';
import Scrollable from '../Scrollable.vue';
import SelfServiceProductsInfo from './SelfServiceProductsInfo.vue';

const cartStore = useCartStore();
const { isProductMandatory } = useMandatoryProductsStore();

</script>

<template>

  <Card class="flex flex-col overflow-y-auto">
    <template #cardTitleIcon>
      <Icon icon="fa-shopping-cart" class="text-sky-600" />
    </template>
    <template #cardTitle>Produtos</template>

    <template #cardBodyScrollable>
      <Scrollable>
        <li v-for="item in cartStore.cart?.items"
          class="flex items-center justify-between gap-3.5 border-b border-zinc-100 dark:border-zinc-100/10 py-4 first:pt-0 last:pb-0 last:border-b-0">
          <SelfServiceProductsInfo class="px-0" :content="item.product.name">
            <template #title>
              <p class="text-xs font-light">
                Produto
                <span v-if='isProductMandatory(item.product.code)' class=' text-sky-600 font-semibold'>
                  - Incluso
                </span>
              </p>
            </template>
          </SelfServiceProductsInfo>


          <div class="ml-auto flex items-center divide-x divide-dashed divide-zinc-200 dark:divide-zinc-100/10">
            <SelfServiceProductsInfo :title="item.product.priceType === 'PRICE_PER_UNIT' ? 'Preço Un.' : 'Preço Kg'"
              :content="`<span class='text-xs'>R$</span> ${toCurrency(item.unitPrice)}`" />
            <SelfServiceProductsInfo title="Qnt" :content="`<span class='text-xs'>x</span> ${item.quantity}`" />
            <SelfServiceProductsInfo v-if="item.product.priceType === 'PRICE_PER_KG' && item.weight" title="Peso"
              :content="`${formatWeight(item.weight)} <span class='text-xs'>kg</span>`" />
            <SelfServiceProductsInfo title="Subtotal"
              :content="`<span class='text-xs'>R$</span> ${toCurrency(item.totalPrice)}`" />
          </div>

          <div class="flex items-center gap-2">
            <Button variant="danger" :disabled="isProductMandatory(item.product.code) && item.quantity === 1"
              :click="() => cartStore.removeItem(item.product.code)">
              <Icon icon="fa-xmark" color="text-inherit" />
            </Button>
          </div>
        </li>
      </Scrollable>
    </template>
  </Card>
</template>
