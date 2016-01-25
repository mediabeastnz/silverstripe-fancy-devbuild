<?php

/**
 * Fancy Dev Build base class
 *
 * @package fancy-devbuild
 *
 */
class DevTasks extends LeftAndMainExtension {
    public function init() {
        $default_tasks = array(
            'devbuild' => array(
                'title' => 'Dev/Build',
                'link' => 'dev/build'
            )
        );
        $config_tasks = Config::inst()->get(__CLASS__, 'tasks');
        // debug::dump($config_tasks);
        $tasks = array_merge_recursive($default_tasks, $config_tasks);

        foreach ($tasks as $item => $values) {
            // Add your own attributes onto the link. In our case, we want to
            // open the link in a new window (not the original)
            $attributes = array(
                'class' => 'devbuild-trigger',
                'target' => '_blank',
                'data-title' => $values['title'],
                'data-link' => $values['link']
            );

            // priority controls the ordering of the link in the stack. The
            // lower the number, the lower in the list
            $priority = -90;
            CMSMenu::add_link($item, $values['title'], '#', $priority, $attributes);
        }
    }
}
