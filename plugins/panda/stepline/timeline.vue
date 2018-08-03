<template>
  <ul class="timeline" ref="timeline">
    <slot />
  </ul>
</template>

<script>
  export default {
    name: 'Timeline',

    props: {
      timelineTheme: {
        type: String,
        default: '#c7c7c7'
      }
    },

    mounted() {
      const timeline = this.$refs.timeline
      timeline.style.setProperty('--timelineTheme', this.timelineTheme)
    }
  }
</script>

<style lang="scss">
  .timeline {
    padding: 0;
    position: relative;
    list-style: none;
    -webkit-font-smoothing: antialiased;
  }

  /*.timeline:after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background-color: var(--timelineTheme);
  }*/

  .timeline-item {
    position: relative;
    padding: 0 0 20px 28px;
    border-bottom: 1px dotted var(--timelineTheme);
    &:after{
    	position: absolute;
	    content: '';
	    left: 60px;
	    top: 5px;
	    width: 1px;
	    height: 100%;
	    background-color: var(--timelineTheme);
	    
    }
  }
  .timeline-item:last-child {
    border-bottom: none;
  }
  .timeline-circle {
    position: absolute;
    top: .28em;
    left: 55px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1px solid var(--timelineTheme);
    background-color: var(--timelineTheme);
    z-index: 1;
    box-sizing: content-box;
   
  }

  .timeline-title {
    position: relative;
    display: inline-block;
    /**
     * BFC inline-block 元素与其兄弟元素、子元素和父元素的外边距都不会折叠（包括其父元素和子元素）
     */
    cursor: crosshair;
    margin: -.15em 0 15px 28px
  }
  .timeline-title:not(:first-child) {
    margin-top: 28px;
  }
  .timeline-title-circle {
    left: -36px;
    top: .15em;
    width: 16px;
    height: 16px;
  }
  .timeline-others {
    width: 40px;
    height: auto;
    top: .2em;
    left: -48px;
    line-height: 1;
    padding: 2px 0;
    text-align: center;
    border: none;
    background-color: #fff;
  }
</style>
