<script lang="ts" setup>
import type {CartItem} from "~/types/cart";
import type {Color, Size} from "~/types/product";

const props = defineProps({
  isOpenPopup: Boolean,
  product: {
    type: Object as PropType<CartItem>,
    required: false
  },
})

const emit = defineEmits<{
  (e: 'close-popup'): void,
}>()

const cartStore = useCartStore()
const selectedColor = ref<Color>(props.product?.selected_color)
const selectedSize = ref<Size>(props.product?.selected_size)
const selectSize = (size: Size) => {
  selectedSize.value = size;
};
const allImages = computed(() => {
  const uniqueImages = new Set<string>();
  props.product.configurable_children.forEach(child => {
    child.media_gallery.forEach(media => {
      uniqueImages.add(media.path);
    });
  });
  return Array.from(uniqueImages);
});
const colors = computed(() => props.product?.configurable_options.find(option => option.attribute_code === 'color')?.values || []);
const sizes = computed(() => props.product?.configurable_options.find(option => option.attribute_code === 'size')?.values || []);
const selectedSku = computed(() => {
  const child = props.product?.configurable_children.find(
      (child) => child.color.id === selectedColor.value.id && child.size.id === selectedSize.value.id
  )
  return child ? child.sku : ''
})
const availableSizes = computed(() => {
  return props.product.configurable_children
      .filter(child => child.color.id === selectedColor.value.id && child.stock.is_in_stock)
      .map(child => child.size);
});
const updateCart = () => {
  cartStore.updateCartItem({
    ...props.product,
    selected_color: selectedColor.value,
    selected_size: selectedSize.value,
  })
  emit('close-popup')
}

const handleOutsideClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit('close-popup')
  }
}
</script>

<template>
  <Transition name="fade">
    <div
        v-if="isOpenPopup"
        class="fixed inset-0 bg-black bg-opacity-50 z-999 flex items-center justify-center p-4"
        @click="handleOutsideClick"
    >
      <div
          class="bg-white rounded-lg w-full max-w-xl overflow-hidden"
          @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b">
          <h2 class="text-lg font-medium">{{ $t('component.cart.edit_product') }}</h2>
          <button
              class="text-gray-400 hover:text-gray-500"
              @click="$emit('close-popup')"
          >
            <Icon class="w-6 h-6" name="lucide:x"/>
          </button>
        </div>

        <div class="p-6">
          <div class="flex gap-6">
            <!-- Product Image -->
            <div class="w-1/2 ">
              <img
                  :alt="product?.name"
                  :src="allImages[0]"
                  class="w-full max-h-[30rem] object-cover rounded-lg"
              />
            </div>

            <!-- Product Details -->
            <div class="flex-1 space-y-4">
              <div>
                <h2 class="font-bold text-2xl">{{ product?.name }}</h2>
                <p class="text-sm text-gray-500">Sku: {{ selectedSku }}</p>
              </div>

              <div class="flex flex-col gap-2">
                <span class="text-2xl font-bold">{{ useFormatNumber(product?.price) }}</span>
                <div class="space-x-2">
              <span class="text-sm text-gray-500 line-through">
                  {{ useFormatNumber(product?.regular_price) }}
                </span>
                  <span class="text-red-500 text-sm font-bold">-{{
                      Math.ceil((product?.regular_price - product?.price) / product?.regular_price * 100)
                    }}%</span>
                </div>
              </div>

              <!-- Color Selection -->
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <p class="text-sm font-bold">{{ $t('general.color') }}:</p>
                  <p class="text-sm">{{ selectedColor?.label }}</p>
                </div>
                <div class="flex gap-2">
                  <button
                      v-for="color in colors"
                      :key="color.id"
                      :class="[{ 'ring-2 ring-[#f62f30] ring-offset-2 ': selectedColor?.id === color.id }]"
                      class="w-8 h-8 rounded-full transition-transform hover:scale-110"
                      @click="()=>{selectedColor = color as Color}">
                    <img :src="color?.swatch?.swatch_link" alt="color" class="w-8 h-8 rounded-full"/>
                  </button>
                </div>
              </div>

              <!-- Size Selection -->
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <p class="text-sm font-bold">{{ $t('general.size') }}:</p>
                  <p class="text-sm">{{ selectedSize?.label }}</p>
                </div>
                <div class="flex flex-wrap gap-2">
                  <!--                  <button-->
                  <!--                      v-for="size in sizes"-->
                  <!--                      :key="size.id"-->
                  <!--                      :class="selectedSize?.id === size.id ? 'border-[#f62f30] text-[#f62f30]' : 'border-gray-300'"-->
                  <!--                      class="min-w-[48px] h-12 border rounded-md flex items-center justify-center"-->
                  <!--                      @click="() => { selectedSize = size }"-->
                  <!--                  >-->
                  <!--                    {{ size.label }}-->
                  <!--                  </button>-->
                  <button
                      v-for="size in sizes"
                      :key="size.id"
                      :class="[
              selectedSize === size && availableSizes.some(item => item.id === selectedSize.id)
                ? 'border-red-500  text-red-500'
                : ' text-gray-700',
              availableSizes.some(item => item.id === size.id)
                ? 'border-gray-500'
                : 'border-gray-200'
            ]"
                      class="py-2 px-3 rounded border text-sm transition-all duration-200 min-w-[48px] h-12"
                      @click="availableSizes.find((item)=>item.id===size.id)?selectSize(size):null"
                  >
          <span
              :class="[
              availableSizes.find((item)=>item.id===size.id) ? 'text-black' : 'line-through text-gray-400 ',
               selectedSize === size && availableSizes.some(item => item.id === selectedSize.id)
                ? 'border-red-500  text-red-500'
                : ' text-gray-700',
          ]"
          >{{ size.label }}</span>
                  </button>
                </div>
              </div>

              <div class="border-t">
                <button class="w-full h-10 text-sm font-bold text-white bg-[#f62f30]" @click="updateCart">
                  {{ $t('component.cart.update') }}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped></style>