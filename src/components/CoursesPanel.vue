<script setup lang="ts">
import Carousel from 'primevue/carousel'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import ImageCompare from 'primevue/imagecompare'
import Tag from 'primevue/tag'
import { useCourses } from '../composables/useCourses'

const { courses } = useCourses()

const responsiveOptions = [
  { breakpoint: '1199px', numVisible: 2, numScroll: 1 },
  { breakpoint: '767px', numVisible: 1, numScroll: 1 },
]
</script>

<template>
  <div class="courses-panel">
    <h2>Catálogo de cursos</h2>

    <Carousel :value="courses" :numVisible="3" :numScroll="1" :circular="true" :responsiveOptions="responsiveOptions">
      <template #item="{ data }">
        <div class="course-card">
          <img :src="data.imagen" :alt="data.nombre" />
          <div class="course-card-body">
            <Tag :value="data.area" severity="info" />
            <h3>{{ data.nombre }}</h3>
            <p>{{ data.instructor }} · {{ data.creditos }} créditos</p>
          </div>
        </div>
      </template>
    </Carousel>

    <h2 class="section-title">Detalle de cada curso</h2>
    <Accordion :value="String(courses[0]?.id ?? '')">
      <AccordionPanel v-for="course in courses" :key="course.id" :value="String(course.id)">
        <AccordionHeader>{{ course.nombre }}</AccordionHeader>
        <AccordionContent>
          <p>{{ course.descripcion }}</p>
          <p><strong>Requisitos:</strong> {{ course.requisitos }}</p>
          <p><strong>Horario:</strong> {{ course.horario }}</p>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>

    <h2 class="section-title">Comparador de imágenes (ImageCompare)</h2>
    <p class="hint">Arrastra el control deslizante para comparar las dos imágenes.</p>
    <ImageCompare class="image-compare">
      <template #left>
        <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&h=500&q=80" alt="Imagen izquierda de ejemplo" />
      </template>
      <template #right>
        <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&h=500&q=80" alt="Imagen derecha de ejemplo" />
      </template>
    </ImageCompare>
  </div>
</template>

<style scoped>
.section-title {
  margin-top: 2rem;
}
.hint {
  color: var(--p-text-muted-color);
  margin-top: -0.5rem;
}
.course-card {
  border: 1px solid var(--p-content-border-color);
  border-radius: 12px;
  overflow: hidden;
  margin: 0.5rem;
  background: var(--p-content-background);
}
.course-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
}
.course-card-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.course-card-body h3 {
  margin: 0;
  font-size: 1.05rem;
}
.course-card-body p {
  margin: 0;
  color: var(--p-text-muted-color);
  font-size: 0.9rem;
}
.image-compare {
  max-width: 800px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}
</style>
