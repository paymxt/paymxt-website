<template>
   <div class="d-flex flex-column text-md-center">
     <div class="p-2">
       <b-btn id="tooltipButton-showEvent" variant="primary">I have a popover</b-btn>
     </div>
     <div class="p-2">
       <b-btn class="px-1" @click="onOpen">Open</b-btn>
       <b-btn class="px-1" @click="onClose">Close</b-btn>
     </div>

     <b-tooltip ref="tooltip" target="tooltipButton-showEvent">
       Hello <strong>World!</strong>
     </b-tooltip>
   </div>
 </template>

 <script>
   export default {
     methods: {
       onOpen() {
         this.$refs.tooltip.$emit('open')
       },
       onClose() {
         this.$refs.tooltip.$emit('close')
       }
     }
   }
 </script>
