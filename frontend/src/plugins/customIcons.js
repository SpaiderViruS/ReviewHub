import { h } from "vue";

// Иконки
import SunIcon from '@/assets/icons/sunIcon.vue';
import EditPencil from '@/assets/icons/editPencil.vue';
import moonIcon from "@/assets/icons/moonIcon.vue";
import userIcon from "@/assets/icons/userIcon.vue";

const customSvgNameToComponent = {
  SunIcon,
  EditPencil,
  moonIcon,
  userIcon
};

const customSVGs = {
  component: (props) => h(customSvgNameToComponent[props.icon]),
};

export { customSVGs };